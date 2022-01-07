import http, { FormHttp } from '../http'
export default {
  /* 查询许可证注销申请信息通用列表 */
  getLicenseApplyList: (params) => http.post('/manager/licenseManagement/getLicenseApplyList', params),
  // 台账明细-核素
  getLedgerDetailsNuclideList: (params) => http.get('/manager/unitManagement/getLedgerDetailsNuclideList', params),
  // 台账明细-获取场所
  getLedgerDetailsPlaceList: () => http.get('/manager/unitManagement/getLedgerDetailsPlaceList'),
  // 许可证申请信息导出
  exportLicenses: '/alarmQuery/exporAlarmQuery'
}
