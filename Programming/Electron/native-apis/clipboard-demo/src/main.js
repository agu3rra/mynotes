const electron = require('electron')
const path = require('path')
const {app, Tray, Menu, clipboard, globalShortcut} = electron
const STACK_SIZE = 5
const ITEM_MAX_LENGTH = 20

function formatItem(item) {
    return item && item.length > ITEM_MAX_LENGTH
        ? item.substr(0, ITEM_MAX_LENGTH) + '...'
        : item
}

function formatMenuTemplateForStack(clipboard, stack) {
    return stack.map((item, i) => {
        return {
            label: `Copy: ${formatItem(item)}`,
            click: _ => clipboard.writeText(item), // copy back to cb
            accelerator: `Cmd+Alt+${i+1}`
        }
    })
}

function addToStack(item, stack) {
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length -1): stack)
}

function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText()
    let latest
    setInterval(_ => {
        latest = clipboard.readText()
        if (latest !== cache) {
            cache = latest
            onChange(cache)
        }
    }, 1000)
}

function registerShortcuts(globalShortcut, clipboard, stack) {
    // register a shortcut for element in clipboard
    globalShortcut.unregisterAll()
    for (let i=0; i<STACK_SIZE; i++){
        globalShortcut.register(`Cmd+Alt+${i+1}`, _ => {
            clipboard.writeText(stack[i])
        })
    }
}

app.on('ready', _ => {
    let stack = []
    const tray = new Tray(path.join('src', 'hackWhite.png'))
    const template = [
        {
            label: '<Empty>',
            enabled: false
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    tray.setContextMenu(menu)

    checkClipboardForChange(clipboard, text => {
        stack = addToStack(text, stack)
        let menu = Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack))
        tray.setContextMenu(menu)
        registerShortcuts(globalShortcut, clipboard, stack)
    }) //since the API doesn't have events we poll it.
})

app.on('will-quit', _ => {
    globalShortcut.unregisterAll()
})
