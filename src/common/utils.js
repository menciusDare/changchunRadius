/**
 * 常用工具类
 */
import storage from './storage'
import commonApi from './api/commonApi'
import store from '../store/index'
export default {
  timeFmtNext (time, n, fmt) {
    const timestamp = new Date(time || new Date()).getTime()
    const date = new Date(timestamp + n * 24 * 3600 * 1000)
    return this.timeFmt(date, fmt)
  },
  /**
   * 时间格式化
   * @param time 时间戳
   * @param fmt 时间格式
   * @return {void | string | *}
   */
  timeFmt (time, fmt) {
    const date = new Date(time)
    const value = {
      'M+': date.getMonth() + 1, // 月份
      'D+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }

    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }

    for (let k in value) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? value[k]
            : ('00' + value[k]).substr(('' + value[k]).length)
        )
      }
    }
    return fmt
  },
  /**
   * 获取路由路径参数
   * @param name
   * @param url
   * @return {string|null}
   */
  getUrlParams (name, url = window.location.href) {
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },
  /**
   * @components utils.js
   * @desc 获取污染物因子
   * @return 获取污染物因子list
   * @name apple
   * @time 2021/9/3
   */
  queryList () {
    store.dispatch('QUERY_POLLUTANTLIST')
    // commonApi.queryPollutantList().then(res => {
    //   res.data = res.data.map(item => {
    //     item.name = item.pollutantName
    //     item.prop = item.pollutantCode
    //     return item
    //   })
    //   return res.data
    // })
  }
}
export const C_TIME = {
  Y: 'YYYY',
  M: 'YYYY-MM',
  D: 'YYYY-MM-DD',
  H: 'YYYY-MM-DD HH',
  m: 'YYYY-MM-DD HH:mm',
  s: 'YYYY/MM/DD \n HH:mm:ss',
  q: 0,//季度
  S: 0,//毫秒
}
