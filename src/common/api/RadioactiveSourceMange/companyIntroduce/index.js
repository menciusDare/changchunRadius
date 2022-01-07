import http, { FormHttp } from '../../http'

export default {
  /* 涉源单位管理 */

  // 技术使用单位管理-查询核技术使用单位列表导出
  exportPageList: '/unitManagement/exportPageList',
  // 查询核技术使用单位列表
  pageListApi: params => http.post('/manager/unitManagement/getPageList', params),
  // 查询单位类型
  unitTypesApi: () => http.post('/manager/common/getUnitTypes'),

  // 使用单位基本信息
  detailApi: (params) => FormHttp.post('/manager/unitManagement/detail', params)

}
