const electron = require('electron')
const path = require('path')
//const app = electron.app
//const Tray = electron.Tray
const {app, Tray, Menu} = electron

app.on('ready', _ => {
    const tray = new Tray(path.join('src', 'hackWhite.png')) // if you use slashes to join path, it may not work in different OS'
    const template = [
        {
            label: 'Wow',
            click: _ => console.log('Wow!')
        },
        {
            label: 'Awesome',
            click: _ => console.log('Dude!')
        }
    ]
    const contextMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(contextMenu)
    tray.setToolTip('This is an awesome Electron app')
})
 