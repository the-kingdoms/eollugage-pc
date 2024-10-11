import { BrowserWindow } from 'electron'

function windowUpdate(startUrl: string) {
  let win = new BrowserWindow({
    title: '얼루가게 PC 업데이트',
    width: 400,
    height: 400,
    resizable: false,
    show: false,
    center: true,
    frame: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.loadURL(startUrl + '/update')
  win.once('ready-to-show', () => {
    win.show()
  })
  return win
}

function windowMain(startUrl: string) {
  let win = new BrowserWindow({
    title: '얼루가게 PC',
    width: 1440,
    height: 900,
    resizable: false,
    useContentSize: true,
    show: false,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.loadURL(startUrl)
  win.once('ready-to-show', () => {
    win.show()
  })
  return win
}

export { windowUpdate, windowMain }
