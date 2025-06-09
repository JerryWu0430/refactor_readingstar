const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let apiProcess = null;

function spawnApiProcess() {
  try {
    // Get the app path - works in both development and production
    const appPath = app.getAppPath();
    const exePath = path.join(appPath, 'live_match_api.exe');
    
    console.log('Attempting to spawn API process from:', exePath);
    
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
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
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
