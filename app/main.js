const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
//const remote = require('electron').remote
const { connection, insertDetail } = require('../db/sqlite')
const path = require('path')

const statik = require('@brettz9/node-static');
const { setEngine } = require('crypto');
const { Button } = require('bootstrap');
const file = new statik.Server(path.join(__dirname, '../sdk'), { cache: 0 })
const filepath = './db/database.db'

const DEBUG = true

var db = connection(filepath)
var settWin = null

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

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

}

function createSettings() {
  settWin = new BrowserWindow({
    width: 400, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    titleBarStyle: 'hidden'
  })
  settWin.loadFile(path.join(__dirname, '../www/settings.html'))
  settWin.on('closed', () => settWin = null)
  settWin.webContents.on('did-finish-load', () => settWin.show())
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
  tray = new Tray(path.join(__dirname, '../assets/tray.ico'))
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
        if (settWin == null) createSettings()
        else settWin.focus()
      })
    },
    {
      label: 'Cerrar',
      click: () => {
        // dialog.showMessageBox(w, {
        //   type: 'question',
        //   message: '¿Estás seguro?',
        //   buttons: [
        //     'Sí',
        //     'No'
        //   ]
        // }).then((res) => {
        //   if (res.response !== 0) return;
        //   if (res.response === 0) {
        //     sdkWindow.destroy()
        //     app.quit()
        //   }
        // })
      }
    },
  ])

  tray.setContextMenu(contextMenu)
}

function initIpc() {
  ipcMain.on('close-settings', (e) => settWin.close())
  ipcMain.on('new-data', (e, values) => insertDetail(db, 1, values))
}

