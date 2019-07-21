const electron = require('electron')
const app = electron.app

const mainWindow = electron.BrowserWindow
const Menu = electron.Menu

app.on('ready', _ => {
    new mainWindow()
    const name = electron.app.getName() // current app name on macOS; reads from productName on package.json
    //ps: first menu item in OSX does not change until after you package the app
    const template = [ //an array of menu items
        {
            label: name,
            submenu: [{
                label: `About ${name}`,
                click: _ => {
                    console.log('clicked submenu.')
                },
                role: 'about' //OSX maps to a menu type recognized by the OS
            }, {
                type: 'separator' // different types are in Electron docs
            }, {
                label: 'Quit',
                click: _ => {app.quit()},
                accelerator: 'Cmd+Q' // shortcut
            }]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu) 
})
 