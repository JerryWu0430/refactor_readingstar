const { contextBridge, ipcRenderer } = require('electron');

// Expose simplified API - only tactiq.io now
contextBridge.exposeInMainWorld('electronAPI', {
  fetchTactiqTranscript: (url) => ipcRenderer.invoke('fetch-tactiq-transcript', url)
});
