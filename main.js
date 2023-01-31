const {app, BrowserWindow, Menu, nativeImage, Tray} = require('electron')
const path = require('path')

const statik = require('@brettz9/node-static');
const file = new statik.Server(`${__dirname}/www`, { cache: 0 })

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response)
    }).resume()
}).listen(9990, "127.0.0.1");

let mainWindow

function createWindow () {
  if (!tray) {
    createTray()
  }
  
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },

    show: false,
    autoHideMenuBar: true
  })

  mainWindow.loadURL('http://localhost:9990')

  mainWindow.on('close', e => {
    e.preventDefault()
    mainWindow.hide()
  })

  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

let tray = null
function createTray () {
  const icon = path.join(__dirname, 'assets/tray.jpg')
  const trayicon = nativeImage.createFromPath(icon)
  tray = new Tray(trayicon.resize({ width: 16 }))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir ventana',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: 'Cerrar',
      click: () => {
        mainWindow.destroy()
        app.quit()
      }
    },
  ])

  tray.setContextMenu(contextMenu)
}
