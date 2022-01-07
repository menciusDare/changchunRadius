/**
 * @author zhanghong
 * @description 文件下载
 */
import MIMEType from './mime'
import Storage from './storage'
import qs from 'qs'
const DOWNLOAD_URL = 'file'
const downloadFile = (url, params, type, pathUrl) => {
  return new Promise(resolve => {
    let pathUrlP = pathUrl != '' ? pathUrl : '.xls'
    if (!url) {
      resolve({
        code: -1,
        msg: '文件不存在'
      })
      return
    }
    let paramsDown = {
      params: params,
      type: type,
      typeUrl: type == 'post' || type == 'formData' ? `radiation/${url}` : `radiation/${url}?${qs.stringify(params)}`,
      headers: {
        method: type == 'formData' ? 'post' : type,
        responseType: 'arraybuffer',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + `${Storage.get('KEY_SESSION')}`
        }
      }
    }
    if (type == 'post') {
      paramsDown.headers['body'] = JSON.stringify(params)
    }
    if (type == 'formData') {
      console.log(params)
      paramsDown.headers['body'] = qs.stringify(params)
      paramsDown.headers['headers']['content-type'] = 'application/x-www-form-urlencoded'
    }
    getDownloadFileBlob(paramsDown, pathUrlP).then(res => {
      if (res.code !== 0) {
        resolve({
          code: -1,
          msg: res.msg
        })
      } else {
        console.log(res.data)
        createDownloadFileBox(res.data, pathUrlP)
        if (res.isBlob) {
          // 释放内存 清除文件引用
          window.URL.revokeObjectURL(res.data)
        }
        resolve({ code: 0 })
      }
    })
  })
}

const getDownloadFileBlob = (paramsDown, pathUrl) => fetch(paramsDown.typeUrl,
  {
    ...paramsDown.headers
  }).then(res => {
  return res.arrayBuffer()
}).then(res => {
  const suffixName = pathUrl
  try {
    const blob = new Blob([res], { type: MIMEType[`.${suffixName}`] })
    if (blob) {
      return {
        code: 0,
        data: URL.createObjectURL(blob),
        isBlob: true,
        suffixName: suffixName
      }
    }
  } catch (e) {
    // 旧版本浏览器下的blob创建对象
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder
    if (e.name === 'TypeError' && window.BlobBuilder) {
      const blobBuilder = new BlobBuilder()
      blobBuilder.append(res)
      const blob = blobBuilder.getBlob(MIMEType[`.xls`])
      return {
        code: 0,
        data: window.URL.createObjectURL(blob),
        isBlob: true,
        suffixName: suffixName
      }
    } else {
      return {
        code: -1,
        msg: '浏览器版本较低，暂不支持该文件类型下载'
      }
    }
  }
})

const createDownloadFileBox = (url, suffixName) => {
  const fileName = `${+new Date()}.${suffixName}`
  const link = document.createElement('a')
  console.log(url, suffixName, 'document.body.appendChild(link);')
  link.href = url
  link.download = fileName
  link.setAttribute('download', fileName)
  link.click()
}

export default {
  downloadFile
}
