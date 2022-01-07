/**
/**
 * 网络请求 axios
 */
import Axios from 'axios'
import C from '@/common/constants'
import qs from 'qs'
import storage from '../../common/storage'
import Store from '../storage'
import {MessageFun} from '../../common/message'
import Router from '../../router/index'
import Config from '../config'
import Storage from '../storage'

const C_API = {
  TIMEOUT: 15000,
  HOST_PATH: '1'
}

const code = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未部署或正在部署中',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}

/**
 *  服务端返回的数据统一格式
 *  {
 *    status: 0,
 *    msg: '开发人员调试可见的消息提示',
 *    notice: '用户可见的消息提示',
 *    data: {},
 *  }
 */
const httpResponse = resp => {
  if (resp.status === 200) {
    // return new Response({ ...resp.data })
    const data = resp.data
    /* 根据自身后端返回数据格式做处理 */
    if (data.code === 0 || resp.status === 200) {
      return data
    }
    return {
      status: data.status,
      url: resp.config.url,
      notice: data.notice,
      msg: data.msg
    }
  } else {
    return Promise.reject(resp)
  }
}

const httpCatch = error => {
  if (error.response && error.response.data) {
    return new Response({
      status: error.response.status,
      notice: code[error.response.status],
      msg: code[error.response.status]
    })
  } else {
    return new Response({
      status: C.ERR_FAIL,
      notice: '网络错误',
      msg: error.message
    })
  }
}

class Response {
  constructor (resp) {
    this._status = resp.status
    this._data = resp.data
    this._msg = resp.msg
    this._notice = resp.notice
  }

  get status () {
    return this._status
  }

  get data () {
    return this._data
  }

  get msg () {
    return this._msg
  }

  get notice () {
    return this._notice
  }

  isOk () {
    if (this.status === C.OK) return true
    MessageFun('error', this.notice)
    return false
  }
}

class HTTP {
  constructor (type, timeout, config) {
    this.type = type
    this._agent = Axios.create({
      timeout,
      ...config
    })
  }

  // 动态设置自定义请求头
  setHeader = (key, value) => {
    if (!key || !value) return
    this._agent.defaults.headers.common[key] = value
  };

  // 移除多余请求头
  removeHeader = key => {
    if (!key) return
    delete this._agent.defaults.headers.common[key]
  };

  get = (url, params = {}) =>
    this._agent
      .get(url, { params })
      .then(httpResponse)
      .catch(httpCatch);
  post = (uri, params) =>
    this._agent
      .post(uri, this.type === 'LoginHttp' ? qs.stringify(params) : params)
      .then(httpResponse)
      .catch(httpCatch);
  put = (uri, params) =>
    this._agent
      .put(uri, params)
      .then(httpResponse)
      .catch(httpCatch);

  patch = (uri, params) =>
    this._agent
      .patch(uri, params)
      .then(httpResponse)
      .catch(httpCatch);

  delete = (uri, params) =>
    this._agent
      .delete(uri, { params })
      .then(httpResponse)
      .catch(httpCatch);
}
const http = new HTTP('http', C_API.TIMEOUT, {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
const FormHttp = new HTTP('LoginHttp', C_API.TIMEOUT, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
const LoginHttp = new HTTP('LoginHttp', C_API.TIMEOUT, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
const uploadFileHttp = new HTTP('http', C_API.TIMEOUT, {

  headers: {
    'Authorization': 'Bearer ' + `${Storage.get('KEY_SESSION')}`,
    'Content-Type': 'multipart/form-data;' + 'boundary = ' + new Date().getTime()
  }
})
// const deleteHttp = new HTTP('http', C_API.TIMEOUT, {

//   headers: {
//     'Authorization': 'Bearer ' + `${Storage.get('KEY_SESSION')}`,
//     'Content-Type': 'multipart/form-data;' + 'boundary = ' + new Date().getTime()
//   }
// })
export { LoginHttp, FormHttp, uploadFileHttp }
export default http
