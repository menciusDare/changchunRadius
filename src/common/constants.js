import Storage from './storage'

/**
 * 常量
 * 项目常量统一管理，便于前端维护数据字典
 */

export default {
  OK: 0,
  HTTP_OK: 200,
  ERR_HTTP_BAD_REQUEST: 400,
  ERR_HTTP_SESSION_TIMEOUT: 401,
  ERR_HTTP_FORBIDDEN: 403,
  ERR_HTTP_NOT_FOUND: 404,
  ERR_HTTP_NOT_ALLOWED: 405,
  ERR_HTTP_SERVER_ERROR: 500,
  ERR_HTTP_BAD_GATEWAY: 502,
  ERR_UNKNOWN: -9999,
  ERR_FAIL: -1,
  ERR_CANCEL: -2,
  ERR_NO_NET: -3,
  ERR_TIMEOUT: -4,

  // Storage 中存储的 key 统一在这里定义，前缀为 KEY_
  KEY_SESSION: 'session',
  KEY_USER: 'KEY_USER',
  KEY_USERNAME: 'username',
  KEY_PASSWORD: 'password'
}

/**
 * 时间常量
 * @type {{q: number, s: string, S: number, D: string, H: string, Y: string, M: string, m: string}}
 */
export const C_TIME = {
  Y: 'YYYY',
  M: 'YYYY-MM',
  D: 'YYYY-MM-DD',
  H: 'YYYY-MM-DD HH',
  m: 'YYYY-MM-DD HH:mm',
  s: 'YYYY-MM-DD HH:mm:ss',
  q: 0, // 季度
  S: 0 // 毫秒
}

/**
* @components constants.js
* @desc 按钮状态
* @params 未提交、退回：编辑、删除；已提交、审批中、审批完成、审批不通过：查看
* @return 0: 编辑 1：查看 2：是交易登记
* @name apple
* @time 2021/9/2想吃
*/

export const BUTTON_STATUS = {
  '未提交': '0',
  '退回': '0',
  '已提交': '1',
  '审批中': '1',
  '审批完成': '1',
  '审批不通过': '1',
  '办理完成': '1',
  '不予办理': '1',
  '空': '0',
  '待上传交易结果': '2',
  '交易结果登记': '2',
  '结果待审核': '1',
  '审核通过': '1',
  '审核中': '1',
  '待修改交易结果': '3',
  '审核完成': '1'
}

export const STATUS_OBJECT = {
  '0': '未提交',
  '1': '审批中',
  '2': '审批完成',
  '3': '审批不通过',
  '4': '退回',
  '5': '不予办理'
}
// 通知状态
export const notice_status = {
  0: '已自动通知',
  1: '已手动通知'
}

// 到期时间类型
export const expiration_Time_Category = {
  1: '已到期',
  2: '30天内到期',
  3: '6个月内到期'
}

export const device_category = {
  1: "Ⅰ类",
  2: "Ⅱ类",
  3: "Ⅲ类",
  4: "Ⅳ类",
  5: "Ⅴ类",
  6: "N类",
}

export const status_list = {
  0: "全部",
  1: "在用",
  2: "非在用" ,
}

export const room_level = {
  4:"无",
  1: "甲级",
  2: "乙级",
  3: "丙级" ,
}
