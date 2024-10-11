import { Menu, Tray, BrowserWindow, app } from 'electron'
import { nativeImage } from 'electron/common'
import path from 'path'
import destroyBeforeClose from './destroy'

function initTray(win: BrowserWindow) {
  let icon = nativeImage.createFromPath(path.join(__dirname, '../icon/eollugage/trayIcon.png'))
  let tray = new Tray(icon)
  tray.addListener('double-click', () => {
    win.show()
  })
  const menu = Menu.buildFromTemplate([
    {
      label: '얼루가게 PC 열기',
      type: 'normal',
      click: () => {
        win.show()
      },
    },
    { type: 'separator' },
    {
      label: '종료',
      type: 'normal',
      click: () => {
        destroyBeforeClose.setIsQuit(true)
        win.close()
      },
    },
  ])
  win.on('close', e => {
    if (!destroyBeforeClose.getIsQuit()) {
      e.preventDefault()
      win.hide()
    } else {
      if (destroyBeforeClose.getIsDestroyed() === false) {
        destroyBeforeClose.destroy()
        destroyBeforeClose.setIsDestroyed(true)
      }
      app.quit()
    }
  })
  tray.setToolTip('OASIS')
  tray.setContextMenu(menu)
}

export { initTray }
