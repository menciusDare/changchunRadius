/**
 * 缓存工具类
 */
export default {
  set (
    key,
    value
  ) {
    if (!key) return void 0
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    sessionStorage.setItem(`${key}`, value)
  },

  get (
    key
  ) {
    if (!key) return void 0
    return sessionStorage.getItem(`${key}`)
  },

  remove (
    key
  ) {
    if (!key) return void 0
    sessionStorage.removeItem(`${key}`)
  },

  clear () {
    try {
      sessionStorage.clear()
    } catch (e) {
      return void 0
    }
  }
}
