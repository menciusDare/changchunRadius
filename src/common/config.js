/**
 * 项目配置文件（项目定制）
 */
import Storage from './storage'
import C from './constants'
const PROJECT_NAME = '长春市核与辐射安全管理系统' // 项目名称
const PROJRCT_NAME_COM = '长春市核与辐射安全管理系统'
const PROJECT_CODE = '10.0.211.29:8690' // 项目code
const PROJECT_PORT = 'manager' // 端

const DEBUG = {
  mock: '/mock', // mock
  dev: '/dev', // 开发服
  test: '/test', // 测试服
  prod: '/prod' // 正式服
}
export default {
  PROJECT_NAME,
  PROJECT_CODE,
  PROJECT_PORT,
  X_CLIENT_TOKEN: `1`
}
