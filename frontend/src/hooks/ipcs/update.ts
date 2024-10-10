import channel from 'constants/channel'

function useUpdate() {
  let ipcRenderer = {
    on: (_: any, __: any) => {},
    removeAllListeners: (_: any) => {},
  }

  try {
    const electron = window.require('electron')
    ipcRenderer = electron.ipcRenderer
  } catch (error) {
    console.log('error:', error)
  }

  const updateCreate = (setLog: Function, setProgress: Function) => {
    ipcRenderer.on(channel.update.log, (_: any, res: string) => {
      console.log('res:', res)
      setLog(res)
    })
    ipcRenderer.on(channel.update.progress, (_: any, res: string) => {
      console.log('res:', res)
      setProgress(parseFloat(res))
    })
  }
  const updateDestroy = () => {
    ipcRenderer.removeAllListeners(channel.update.log)
    ipcRenderer.removeAllListeners(channel.update.progress)
  }
  return { updateCreate, updateDestroy }
}

export default useUpdate
