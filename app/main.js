const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const { connection, insertDetail } = require('../db/sqlite')
const path = require('path')

const statik = require('@brettz9/node-static');
const file = new statik.Server(path.join(__dirname, '../sdk'), { cache: 0 })
const filepath = './db/database.db'

const DEBUG = true

var db = connection(filepath)
var mainWindow
var tray

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response)
  }).resume()
}).listen(9990, "127.0.0.1");


function createSdk() {
  sdkWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  })
  sdkWindow.loadURL('http://localhost:9990')
  sdkWindow.on('close', e => {
    e.preventDefault()
    mainWindow.hide()
  })
}

function createWindow() {
  if (!tray) {
    createTray()
  }



}

app.whenReady().then(() => {
  ipcMain.on('new-data', handleDataSDK)
  createSdk()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


function createTray() {
  tray = new Tray(path.join(__dirname, 'assets/tray.ico'))
  tray.setToolTip('MorphCast VRAIN')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir ventana',
      click: () => {
        mainWindow.show()
      }
    },
    {
      label: 'Abrir ajuster',
      click: () => {

      }
    },
    {
      label: 'Cerrar',
      click: () => {
        sdkWindow.destroy()
        app.quit()
      }
    },
  ])

  tray.setContextMenu(contextMenu)
}

function handleDataSDK(e, values) { insertDetail(db, 1, values) }
