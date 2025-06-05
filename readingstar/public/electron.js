const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
    },
  });

  let startURL;
  if (app.isPackaged) {
    const buildPath = path.join(__dirname, '../build/index.html');
    if (fs.existsSync(buildPath)) {
      startURL = `file://${buildPath}`;
    } else {
      console.error('Build file not found:', buildPath);
      win.loadURL('data:text/html,<h1>Build not found</h1><p>Please run npm run build before packaging.</p>');
      return;
    }
  } else {
    startURL = 'http://localhost:3000';
  }

  win.loadURL(startURL).catch(err => {
    console.error('Failed to load URL:', startURL, err);
  });
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
