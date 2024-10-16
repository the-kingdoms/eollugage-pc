import { BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import channel from './channel'
import { sleep } from './utils/function'

const isDev: boolean = process.env.NODE_ENV === 'development'

function updater(win_update: BrowserWindow) {
  return new Promise<void>(async resolve => {
    const webContents = win_update.webContents

    await sleep(1000)
    webContents.send(channel.update.log, '업데이트...')
    isDev && resolve()
    autoUpdater.on('checking-for-update', () => {
      webContents.send(channel.update.log, '업데이트 확인중입니다...')
    })
    autoUpdater.on('update-available', () => {
      webContents.send(channel.update.log, '업데이트가 있습니다!')
    })
    autoUpdater.on('update-not-available', async () => {
      await sleep(500)
      webContents.send(channel.update.log, '최신버전입니다.')
      await sleep(1500)
      resolve()
    })
    autoUpdater.on('error', async err => {
      await sleep(500)
      const message = '업데이트에 실패했습니다.</br>' + err.message.split('\n')[0]
      webContents.send(channel.update.log, message)
      console.log(message)
      await sleep(1500)
      resolve()
    })
    autoUpdater.on('download-progress', progressObj => {
      let message = '다운로드 속도 : ' + (progressObj.bytesPerSecond / 1024).toFixed(2) + ' KB/s'
      message = message + '</br>' + progressObj.percent.toFixed(2) + '%'
      message =
        message +
        ' ( ' +
        (progressObj.transferred / 1024).toFixed(2) +
        'KB / ' +
        (progressObj.total / 1024).toFixed(2) +
        'KB )'
      webContents.send(channel.update.log, message)
      webContents.send(channel.update.progress, progressObj.transferred / progressObj.total)
    })
    autoUpdater.on('update-downloaded', () => {
      webContents.send(channel.update.log, '업데이트가 완료되었습니다.')
      autoUpdater.quitAndInstall()
    })
    autoUpdater.checkForUpdates()
  })
}
export default updater
