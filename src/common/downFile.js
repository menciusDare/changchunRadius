/**
 * @author zhanghong
 * @description 文件下载
 */
import MIMEType from './mime'
import Storage from './storage'

const DOWNLOAD_URL = 'file'
const downloadFile = (url,params) => {
  return new Promise(resolve => {
    if (!url) {
      resolve({
        code: -1,
        msg: '文件不存在'
      })
      return
    }
    getDownloadFileBlob(url,params).then(res => {
      if (res.code !== 0) {
        resolve({
          code: -1,
          msg: res.msg
        })
      } else {
        console.log(res.data,'1')
        createDownloadFileBox(res.data, res.suffixName)
        if (res.isBlob) {
          // 释放内存 清除文件引用
          window.URL.revokeObjectURL(res.data)
        }
        resolve({ code: 0 })
      }
    })
  })
}

const getDownloadFileBlob = (url,params) => fetch(`${url}`,
  {
    method: 'post',
    responseType: 'arraybuffer',
    params:params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      'Authorization': 'Bearer ' + `${Storage.get('KEY_SESSION')}`
    }
  }).then(res => {
  return res.arrayBuffer()
}).then(res => {
  const suffixName = url.split('.')[1];
  // .toLowerCase()
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
      const blob = blobBuilder.getBlob(MIMEType[`.${suffixName}`])
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
  console.log(url,suffixName, 'document.body.appendChild(link);')
  link.href = url
  link.download = fileName
  link.setAttribute('download', fileName)
  link.click()
}

export default {
  downloadFile
}
