const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 400,
        heigth: 100,
        webPreferences:{ nodeIntegration: true }
    })

    mainWindow.loadURL(`file://${__dirname}/status.html`)

    // Cleanup
    mainWindow.on('close', _ => {
        mainWindow = null
    })
})
