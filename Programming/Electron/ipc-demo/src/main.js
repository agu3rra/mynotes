const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const countdown = require('./countdown.js')
const ipc = electron.ipcMain

let mainWindow

const windows = []

app.on('ready', _ => {
    [1, 2, 3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400,
            webPreferences: {
                nodeIntegration: true
            }
        })
    
        win.loadURL(`file://${__dirname}/countdown.html`)
    
        // Garbage collect
        win.on('closed', _ => {
            console.log('Main window closed.')
            mainWindow = null
        })
    
        windows.push(win)
    })
})

ipc.on('countdown-start', _ => {
    // need something out of countdown
    // send it back to the render module
    countdown(count => {
        windows.forEach(win => {
            win.webContents.send('countdown', count) // webContents is an event emitter instance
        })
    })
})