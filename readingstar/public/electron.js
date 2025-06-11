const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let apiProcess = null;

// Remove YouTube handlers, keep only tactiq with Puppeteer support
ipcMain.handle('fetch-tactiq-transcript', async (event, youtubeUrl) => {
  try {
    console.log('[Main] Starting transcript fetch for:', youtubeUrl);
    
    // Go straight to Puppeteer approach with detailed logging
    return await tryPuppeteerApproach(youtubeUrl);
    
  } catch (error) {
    console.error('Error fetching tactiq transcript:', error);
    throw error;
  }
});

async function tryPuppeteerApproach(youtubeUrl) {
  let puppeteer;
  let browser;
  
  try {
    console.log('[Main] Starting Puppeteer approach...');
    
    // Extract video ID from YouTube URL
    const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (!videoIdMatch) {
      console.error('[Main] Invalid YouTube URL format:', youtubeUrl);
      throw new Error('Invalid YouTube URL format');
    }
    const videoId = videoIdMatch[1];
    console.log('[Main] Extracted video ID:', videoId);
    
    // Try to import puppeteer
    try {
      console.log('[Main] Attempting to import Puppeteer...');
      puppeteer = require('puppeteer');
      console.log('[Main] Puppeteer imported successfully');
    } catch (importError) {
      console.error('[Main] Puppeteer import failed:', importError.message);
      return JSON.stringify({
        error: "PUPPETEER_NOT_AVAILABLE",
        message: "Browser automation not available. Please install Puppeteer.",
        suggestion: "Run 'npm install puppeteer' in the project directory",
        install_command: "npm install puppeteer"
      });
    }
    
    console.log('[Main] Launching headless browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-gpu'
      ]
    });
    console.log('[Main] Browser launched successfully');
    
    const page = await browser.newPage();
    console.log('[Main] New page created');
    
    // Set user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 720 });
    console.log('[Main] User agent and viewport set');
    
    // Enable request interception to block unnecessary resources
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        req.abort();
      } else {
        console.log('[Main] Allowing request to:', req.url());
        req.continue();
      }
    });
    console.log('[Main] Request interception enabled');
    
    // Log console messages from the page
    page.on('console', (msg) => {
      console.log('[Browser Console]', msg.type(), ':', msg.text());
    });
    
    // Log page errors
    page.on('pageerror', (error) => {
      console.error('[Browser Error]:', error.message);
    });
    
    // Navigate to tactiq.io with the YouTube URL
    const encodedUrl = encodeURIComponent(youtubeUrl);
    const tactiqUrl = `https://tactiq.io/tools/run/youtube_transcript?yt=${encodedUrl}`;
    
    console.log('[Main] Navigating to:', tactiqUrl);
    
    try {
      await page.goto(tactiqUrl, { 
        waitUntil: 'networkidle2', 
        timeout: 45000 
      });
      console.log('[Main] Page navigation completed');
    } catch (navigationError) {
      console.error('[Main] Navigation failed:', navigationError.message);
      throw navigationError;
    }
    
    // Wait a bit for the page to load
    console.log('[Main] Waiting for page to stabilize...');
    await page.waitForTimeout(3000);
    
    // Get page title and URL to verify we're on the right page
    const pageTitle = await page.title();
    const pageUrl = await page.url();
    console.log('[Main] Page title:', pageTitle);
    console.log('[Main] Page URL:', pageUrl);
    
    // Check if page has loaded content
    const bodyContent = await page.evaluate(() => {
      return document.body ? document.body.innerText.length : 0;
    });
    console.log('[Main] Page body content length:', bodyContent);
    
    // Take a screenshot for debugging (optional)
    try {
      await page.screenshot({ path: 'tactiq-debug.png', fullPage: true });
      console.log('[Main] Debug screenshot saved as tactiq-debug.png');
    } catch (screenshotError) {
      console.log('[Main] Could not save screenshot:', screenshotError.message);
    }
    
    console.log('[Main] Searching for transcript elements...');
    
    // Try multiple selectors for transcript content
    const transcriptSelectors = [
      'textarea',
      '[id*="transcript"]',
      '[class*="transcript"]',
      'textarea[id*="transcript"]',
      'textarea[class*="transcript"]',
      'pre',
      '[data-testid*="transcript"]',
      'button[onclick*="copyTranscript"]',
      '[class*="copy"]',
      'button:contains("Copy")'
    ];
    
    // Check what elements are available on the page
    for (const selector of transcriptSelectors) {
      try {
        const elements = await page.$$(selector);
        console.log(`[Main] Found ${elements.length} elements for selector: ${selector}`);
        
        if (elements.length > 0) {
          for (let i = 0; i < Math.min(elements.length, 3); i++) {
            const text = await page.evaluate(el => {
              return (el.value || el.textContent || el.innerText || '').substring(0, 100);
            }, elements[i]);
            console.log(`[Main] Element ${i} text preview:`, text);
          }
        }
      } catch (selectorError) {
        console.log(`[Main] Error checking selector ${selector}:`, selectorError.message);
      }
    }
    
    let transcriptContent = null;
    
    // Try to extract transcript from various sources
    console.log('[Main] Attempting to extract transcript content...');
    
    transcriptContent = await page.evaluate(() => {
      console.log('[Browser] Starting transcript extraction...');
      
      // Method 1: Look for transcript in textarea elements
      const textareas = document.querySelectorAll('textarea');
      console.log('[Browser] Found', textareas.length, 'textarea elements');
      
      for (let i = 0; i < textareas.length; i++) {
        const textarea = textareas[i];
        const value = textarea.value || '';
        console.log(`[Browser] Textarea ${i} value length:`, value.length);
        console.log(`[Browser] Textarea ${i} preview:`, value.substring(0, 100));
        
        if (value && value.length > 50) {
          console.log('[Browser] Found transcript in textarea');
          return value;
        }
      }
      
      // Method 2: Look for elements with transcript in id or class
      const transcriptElements = document.querySelectorAll('[id*="transcript"], [class*="transcript"]');
      console.log('[Browser] Found', transcriptElements.length, 'transcript-related elements');
      
      for (let i = 0; i < transcriptElements.length; i++) {
        const element = transcriptElements[i];
        const text = element.textContent || element.innerText || '';
        console.log(`[Browser] Transcript element ${i} text length:`, text.length);
        console.log(`[Browser] Transcript element ${i} preview:`, text.substring(0, 100));
        
        if (text && text.length > 50) {
          console.log('[Browser] Found transcript in transcript element');
          return text;
        }
      }
      
      // Method 3: Look for copy buttons and nearby content
      const buttons = document.querySelectorAll('button');
      console.log('[Browser] Found', buttons.length, 'button elements');
      
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const buttonText = button.textContent || '';
        
        if (buttonText.toLowerCase().includes('copy')) {
          console.log(`[Browser] Found copy button:`, buttonText);
          
          // Look for nearby content
          const parent = button.closest('div, section, main');
          if (parent) {
            const parentText = parent.textContent || parent.innerText || '';
            console.log(`[Browser] Copy button parent text length:`, parentText.length);
            console.log(`[Browser] Copy button parent preview:`, parentText.substring(0, 200));
            
            if (parentText && parentText.length > 100) {
              console.log('[Browser] Found transcript near copy button');
              return parentText;
            }
          }
        }
      }
      
      // Method 4: Look for pre elements (sometimes transcripts are in pre tags)
      const preElements = document.querySelectorAll('pre');
      console.log('[Browser] Found', preElements.length, 'pre elements');
      
      for (let i = 0; i < preElements.length; i++) {
        const pre = preElements[i];
        const text = pre.textContent || pre.innerText || '';
        console.log(`[Browser] Pre element ${i} text length:`, text.length);
        
        if (text && text.length > 50) {
          console.log('[Browser] Found transcript in pre element');
          return text;
        }
      }
      
      // Method 5: Get all text content and filter
      const bodyText = document.body.textContent || document.body.innerText || '';
      console.log('[Browser] Total body text length:', bodyText.length);
      console.log('[Browser] Body text preview:', bodyText.substring(0, 500));
      
      return bodyText.length > 500 ? bodyText : null;
    });
    
    console.log('[Main] Transcript extraction completed');
    
    if (transcriptContent && transcriptContent.length > 50) {
      console.log('[Main] Successfully extracted transcript, length:', transcriptContent.length);
      console.log('[Main] Transcript preview:', transcriptContent.substring(0, 200));
      return transcriptContent;
    } else {
      console.log('[Main] No meaningful transcript content found');
      return JSON.stringify({
        error: "NO_TRANSCRIPT_FOUND",
        message: "Could not find transcript content on the page",
        suggestion: "Video may not have captions available or page structure changed",
        debug_info: {
          page_title: await page.title(),
          page_url: await page.url(),
          content_length: transcriptContent ? transcriptContent.length : 0
        }
      });
    }
    
  } catch (error) {
    console.error('[Main] Puppeteer approach failed:', error);
    console.error('[Main] Error stack:', error.stack);
    return JSON.stringify({
      error: "BROWSER_ERROR",
      message: "Failed to load page with browser automation: " + error.message,
      suggestion: "Try a different video or check if tactiq.io is accessible",
      error_details: error.stack
    });
  } finally {
    if (browser) {
      try {
        console.log('[Main] Closing browser...');
        await browser.close();
        console.log('[Main] Browser closed successfully');
      } catch (e) {
        console.error('[Main] Error closing browser:', e.message);
      }
    }
  }
}

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
