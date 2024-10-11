class destroyBeforeClose {
  isQuit: boolean
  isDestroyed: boolean
  callbackList: Function[]
  constructor() {
    this.callbackList = []
    this.isQuit = false
    this.isDestroyed = false
  }
  setIsQuit(flag: boolean) {
    this.isQuit = flag
  }
  setIsDestroyed(flag: boolean) {
    this.isDestroyed = flag
  }
  getIsQuit() {
    return this.isQuit
  }
  getIsDestroyed() {
    return this.isDestroyed
  }
  addCallback(callback: Function) {
    this.callbackList.push(callback)
  }
  destroy() {
    for (let i = 0; i < this.callbackList.length; i++) {
      this.callbackList[i]()
    }
  }
}

const destoryInstance = new destroyBeforeClose()

export default destoryInstance
