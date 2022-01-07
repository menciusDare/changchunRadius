import http, {LoginHttp, FormHttp} from './http'

export default {
  signIn: (params) => LoginHttp.post('/api/auth/web/token', params), // 登录
  signOut: () => http.delete('/api/auth/web/token'), // 登出
  getEnterpriseSimple: () => http.get('/api/emission/enterprise/getEnterpriseSimple'), // 查询用户信息
  // getCaptcha: () => Http.get('/manager/captcha') // 登录获取验证码
  register: (params) => http.post('manager/enterprise/register', params),
  getRegisterById: (id) => http.get('manager/registerManagement/getRegisterById/' + id),
  edit: (params) => http.post('manager/enterprise/edit', params),
  getCaptcha: (params) => http.get('getCaptcha/sysUser/sendSms', params),
  applyUser: (params) => http.get('getCaptcha/sysUser/forgetPassword', params),
  forgerPass: (params) => FormHttp.post('getCaptcha/sysUser/forgetResetPwd', params)
}
