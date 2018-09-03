class CacheServer {
  constructor () {
    this.list = []
    this.regState = false
  }
  reg (list) {
    if (!Array.isArray(list)) {
      console.error('reg() param is Array')
      return false
    }
    this.regState = true
    this.list = list
  }
  check () {
    if (!this.regState) {
      console.error('it are not activated,Please firstly register it!')
      return false
    }
    return true
  }
  add (item) {
    if (!this.check()) {
      return
    }
    this.list.push(item)
  }
  remove (item) {
    if (!this.check()) {
      return
    }
    const index = this.list.indexOf(item)
    if (index > -1) {
      this.list.splice(index, 1)
    } else {
      console.error('CacheServer: cache list no found ' + item)
    }
  }
}

export default new CacheServer()
