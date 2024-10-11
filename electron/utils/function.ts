import { Notification, nativeImage } from 'electron'
import path from 'path'

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function showNotification(title: string, body: string) {
  const icon = nativeImage.createFromPath(path.join(__dirname, '../../icon/eollugage/logo.png'))
  new Notification({ title: title, icon: icon, body: body }).show()
  console.log('Notification: ' + title + ' - ' + body)
}

export { sleep, showNotification }
