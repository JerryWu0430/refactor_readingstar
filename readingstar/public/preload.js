const { contextBridge, ipcRenderer } = require('electron');

// Expose simplified API that matches React Native approach
contextBridge.exposeInMainWorld('electronAPI', {
  fetchYouTubeHTML: (url) => ipcRenderer.invoke('fetch-youtube-html', url),
  fetchSubtitleXML: (url) => ipcRenderer.invoke('fetch-subtitle-xml', url)
});
