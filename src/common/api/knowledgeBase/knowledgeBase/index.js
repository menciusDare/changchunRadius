// 统计分析>放射源统计管理
// import http from '../../http'
import http, {FormHttp, uploadFileHttp} from '../../http'

export default {
  // getOrgList: params => http.post('/manager/common/getLicenseAuthoritys', params), // 查询发证机构
  getRadiusCodeNumList: params => http.get('/manager/sourceInformation/radiationCodeOrder', params), // 放射源编码序列号分配
  getNonBlockWorkList: params => http.get('/manager/sourceInformation/getUnsealedWorkplaceLevel', params), // 非密封放射性物质工作场所分级
  getXrayDivisionList: params => http.get('/manager/sourceInformation/getRayDeviceCategory', params), // 射线装置分类
  getUsgaeListKB: params => FormHttp.post('/manager/useOfRadiationSource/getRadiativeResourcePurposes', params), // 放射性物质用途分类
  getNonUsgaeListKB: params => FormHttp.post('/manager/useOfRadiationSource/getUnsealedRadiativePurposes', params), // 非放射性物质用途分类
  // getXRayListKB: params => FormHttp.post('/radiation/useOfRadiationSource/getRayDevicePurposes', params), // 射线装置用途
  // getMonitorListKB: params => FormHttp.post('/radiation/supervisionEnforceTheLaw/getSupervisionAndEnforcementInfo', params), // 射线装置用途
  getQueryListKB: params => http.post('/manager/publicDocument/getPageList', params), // 公共文档库查询
  getXRayListKB: params => FormHttp.post('/manager/useOfRadiationSource/getRayDevicePurposes', params), // 射线装置用途
  getMonitorListKB: params => FormHttp.post('/manager/supervisionEnforceTheLaw/getSupervisionAndEnforcementInfo', params), // 射线装置用途
  // exportInterface: params => http.get('/manager/radioactiveSources/regionExport', params, {responseType: 'arraybuffer'}) // 区域统计导出
  uploadFileKB: params => uploadFileHttp.post('/manager/publicDocument/uploadFile', params), // 文件上传
  // queryFileList: params => http.post('/manager/publicDocument/getPageList', params) // 获取文件列表

  deletePubDoc: params => FormHttp.delete(`manager/publicDocument/deleteFile?fileId=${params}`), // 公共文档库删除
  // deletePubDoc: params => uploadFileHttp.delete('/manager/publicDocument/deleteFile', params)
  // 放射源核素信息
  getRadionuclide: params => FormHttp.post('/manager/sourceInformation/getNuclideInfoPage', params), // 射线装置用途
  // 非密封放射性物质核素信息
  getUnsealedradionuclide: params => FormHttp.post('/manager/sourceInformation/getUnsealedInfoPage', params) // 射线装置用途
}
