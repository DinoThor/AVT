const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

contextBridge.exposeInMainWorld('dataAPI', {
  newUser: (values) => ipcRenderer.send('new-user', values),
  insertData: (values) => ipcRenderer.send('new-data', values),
  updateAnalisis: () => ipcRenderer.send('update-analisis')
})

contextBridge.exposeInMainWorld('electronAPI', {
  closeWin: (type) => ipcRenderer.send('close-win', type)
})
