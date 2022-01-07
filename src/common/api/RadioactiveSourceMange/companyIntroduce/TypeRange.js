// 活动种类和范围
import http, { FormHttp } from '../../http'

export default {
  // 活动种类和范围-查询放射源信息
  getSourceList: (params) => FormHttp.post('/manager/unitManagement/getSourceList', params),
  // 活动种类和范围-查询非密封放射性物质信息
  getUnsealedMaterials: (params) => FormHttp.post('/manager/unitManagement/getUnsealedMaterials', params),
  // 活动种类和范围-活动种类和范围-射线装置
  getRayDevices: (params) => FormHttp.post('/manager/unitManagement/getRayDevices', params),
  // 许可证查询
  getCancellationQueryList: (params) => http.post('/manager/licenseManagement/getLicenseApplyList', params)
}
