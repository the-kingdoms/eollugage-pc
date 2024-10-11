import { app } from 'electron'
import { initTray } from './init'
import updater from './updater'
import { showNotification } from './utils/function'
import { windowMain, windowUpdate } from './window'

const isDev: boolean = process.env.NODE_ENV === 'development'

console.log('isDev:', isDev)

let startUrl: string = isDev ? 'http://localhost:3000' : 'https://gage-pc.eolluga.com'

Object.defineProperty(app, 'isPackaged', {
  get() {
    return true
  },
})

function createWindow() {
  console.log(new Date().toLocaleString())
  console.log('Oasis is starting...')

  // Update window
  let win_update = windowUpdate(startUrl)
  win_update.webContents.toggleDevTools()
  updater(win_update)
    .then(() => {
      let win_main = windowMain(startUrl)
      initTray(win_main)
      app.on('activate', () => {
        win_main.show()
      })
      showNotification('얼루가게', '안녕하세요 얼루가게입니다')
      win_update.close()
    })
    .catch(error => {
      console.error(String(error))
      win_update.close()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  console.log(new Date().toLocaleString())
  console.log('eollugage-pc is closing...')
  app.quit()
})
