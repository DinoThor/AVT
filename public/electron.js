const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

const express = require('express');
const localtunnel = require('localtunnel');
const expressApp = express();

var QRCode = require('qrcode');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680, frame: false });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    //mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  createWindow();
  expressApp.get("/", (req, res) => res.send("Hello World!"));
  expressApp.listen(3000, () => console.log("Server on 3000"));
  localtunnel({port: 3000}).then((tunnel) => {
    console.log(tunnel.url)
  })
  QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
    console.log(url)
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});