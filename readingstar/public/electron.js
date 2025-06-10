const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let apiProcess = null;

// Store cookies and session data between requests
let sessionCookies = '';

ipcMain.handle('fetch-youtube-html', async (event, url) => {
  try {
    const fetch = (await import('node-fetch')).default;
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none'
    };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Store cookies for subsequent requests
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      sessionCookies = setCookie;
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching YouTube HTML:', error);
    throw error;
  }
});

ipcMain.handle('fetch-subtitle-xml', async (event, url) => {
  try {
    const fetch = (await import('node-fetch')).default;
    
    // Use IDENTICAL headers to the HTML request + stored cookies
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,*/*;q=0.5',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Referer': 'https://www.youtube.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin'
    };

    // Add stored cookies if available
    if (sessionCookies) {
      headers['Cookie'] = sessionCookies;
    }

    const response = await fetch(url, { 
      headers,
      timeout: 15000 
    });
    
    console.log('[Main] Subtitle response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('[Main] Subtitle response length:', text.length);
    
    if (text.length === 0) {
      throw new Error('Empty response - signature may be invalid');
    }
    
    return text;
  } catch (error) {
    console.error('Error fetching subtitle XML:', error);
    throw error;
  }
});


function spawnApiProcess() {
  try {
    const isDev = !app.isPackaged;
    let exePath;
    
    if (isDev) {
      // In development, exe is in public folder (same directory as this file)
      exePath = path.join(__dirname, 'live_match_api.exe');
    } else {
      // In production, exe should be in the app resources directory
      exePath = path.join(process.resourcesPath, 'live_match_api.exe');
    }
    
    console.log('Attempting to spawn API process from:', exePath);
    
    // Check if file exists before trying to spawn
    if (!fs.existsSync(exePath)) {
      console.error('API executable not found at:', exePath);
      
      // Try alternative paths as fallback
      const fallbackPaths = [
        path.join(__dirname, 'live_match_api.exe'),
        path.join(app.getAppPath(), 'live_match_api.exe'),
        path.join(process.resourcesPath, 'app.asar.unpacked', 'live_match_api.exe')
      ];
      
      for (const fallbackPath of fallbackPaths) {
        console.log('Trying fallback path:', fallbackPath);
        if (fs.existsSync(fallbackPath)) {
          exePath = fallbackPath;
          console.log('Found exe at fallback path:', exePath);
          break;
        }
      }
      
      if (!fs.existsSync(exePath)) {
        console.error('API executable not found in any location');
        return;
      }
    }
    
    // Spawn the API process
    apiProcess = spawn(exePath, [], {
      detached: false,
      stdio: ['pipe', 'pipe', 'pipe'] // stdin, stdout, stderr
    });
    
    // Handle stdout (normal output)
    apiProcess.stdout.on('data', (data) => {
      console.log(`[API] ${data.toString().trim()}`);
    });
    
    // Handle stderr (error output)
    apiProcess.stderr.on('data', (data) => {
      console.error(`[API Error] ${data.toString().trim()}`);
    });
    
    apiProcess.on('spawn', () => {
      console.log('API process spawned successfully');
    });
    
    apiProcess.on('error', (error) => {
      console.error('Failed to start API process:', error);
      apiProcess = null;
    });
    
    apiProcess.on('exit', (code, signal) => {
      console.log(`API process exited with code ${code} and signal ${signal}`);
      apiProcess = null;
    });
    
  } catch (error) {
    console.error('Error spawning API process:', error);
  }
}

function killApiProcess() {
  if (apiProcess) {
    console.log('Terminating API process...');
    apiProcess.kill('SIGTERM');
    
    // Force kill after 5 seconds if it doesn't terminate gracefully
    setTimeout(() => {
      if (apiProcess) {
        console.log('Force killing API process...');
        apiProcess.kill('SIGKILL');
      }
    }, 5000);
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'StoreLogo.png'), // Add this line
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // Use app.isPackaged instead of electron-is-dev
  const isDev = !app.isPackaged;
  
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  win.loadURL(startURL);

  // Open DevTools in development only
  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  // Spawn the API process before creating the window
  spawnApiProcess();
  createWindow();
});

app.on('window-all-closed', () => {
  // Kill the API process before quitting
  killApiProcess();
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Ensure API process is killed when app is quitting
  killApiProcess();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
