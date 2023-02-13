const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const { connection, insertDetail, createUser, updateAnalisis } = require('../db/sqlite')
const path = require('path')

const statik = require('@brettz9/node-static');
const { mainModule } = require('process');
const file = new statik.Server(path.join(__dirname, '../sdk'), { cache: 0 })
const filepath = '../db/database.db'

var db = connection(filepath)
var mainWindow

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


function createMainWin() {
  mainWindow = new BrowserWindow({
    width:1240, height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    titleBarStyle: 'hidden'
  })
  mainWindow.on('closed', () => mainWindow = null)
  mainWindow.loadFile(path.join(__dirname, '../www/index.html'))
}


app.whenReady().then(() => {
  createSdk()
  createTray()
  initIpc()
  createMainWin()

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
      label: 'Abrir',
      click: () => {
        mainWindow.show()
      }
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
  ipcMain.on('close-win', (e) => mainWindow.hide())

  // Data API
  ipcMain.on('new-data', (e, values) => insertDetail(db, 1, values))
  ipcMain.on('new-user', (e, values) => createUser(db, values))
  ipcMain.on('update-analisis', (e) => updateAnalisis(db, 1))
}

