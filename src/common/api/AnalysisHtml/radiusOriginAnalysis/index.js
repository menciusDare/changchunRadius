// 统计分析>放射源统计管理
import http from '../../http'

export default {
  getOrgList: params => http.post('/manager/common/getLicenseAuthoritys', params), // 查询发证机构
  getAreaList: params => http.post('/manager/common/getRegions', params), // 查询区域
  getTableInfoFS: params => http.get('/manager/radioactiveSources/region', params), // 区域统计
  getTableInfoHY: params => http.get('/manager/radioactiveSources/industry', params), // 行业统计
  getTableInfoYT: params => http.get('/manager/radioactiveSources/purpose', params), // 用途统计
  getTableInfoHS: params => http.get('/manager/radioactiveSources/nuclide', params), // 核素统计
  getChangeTrend: params => http.get('/manager/radioactiveSources/change', params) // 变化趋势
  // exportInterface: params => http.get('/manager/radioactiveSources/regionExport', params, {responseType: 'arraybuffer'}) // 区域统计导出

}
