const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const { connection, insertDetail } = require('../db/sqlite')
const path = require('path')

const statik = require('@brettz9/node-static');
const file = new statik.Server(path.join(__dirname, '../sdk'), { cache: 0 })
const filepath = '../db/database.db'

var db = connection(filepath)
var windows = {
  settWin: [null, '../www/settings.html'],
  userWin: [null, '../www/newuser.html']
}

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response)
  }).resume()
}).listen(9990, "127.0.0.1");


function createSdk() {
  sdkWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  })
  sdkWindow.loadURL('http://localhost:9990')
}


function createWin(type) {
  win = windows[type][0]
  windows[type][0] = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    titleBarStyle: 'hidden'
  })
  windows[type][0].loadFile(path.join(__dirname, windows[type][1]))
  windows[type][0].on('closed', () => windows[type][0] = null)
  windows[type][0].webContents.on('did-finish-load', () => windows[type][0].show())
}


app.whenReady().then(() => {
  createSdk()
  createTray()
  initIpc()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


function createTray() {
  var tray = new Tray(path.join(__dirname, '../assets/tray.ico'))
  tray.setToolTip('MorphCast VRAIN')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir ventana',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: 'Abrir ajustes',
      click: (() => {
        if (windows['settWin'][0] == null) createWin('settWin')
        else windows['settWin'][0].focus()
      })
    },
    {
      label: 'Crear usuario',
      click: (() => {
        if (windows['userWin'][0] == null) createWin('userWin')
        else windows['userWin'][0].focus()
      })
    },
    {
      label: 'Cerrar',
      click: () => {
        sdkWindow.destroy()
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
}

function initIpc() {
  ipcMain.on('close-win', (e, type) => windows[type][0].close())

  ipcMain.on('new-data', (e, values) => insertDetail(db, 1, values))
  ipcMain.on('update-analisis', (e) => updateAnalisis(db, 1))
}

