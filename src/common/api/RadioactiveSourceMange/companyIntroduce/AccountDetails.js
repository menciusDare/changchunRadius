// 台账明细
import http, { FormHttp } from '../../http'

export default {
  /* 公用 */
  // 台账明细-核素
  getLedgerDetailsNuclideList: (params) => http.get('/radiation/unitManagement/getLedgerDetailsNuclideList', params),
  // 台账明细-获取场所
  getLedgerDetailsPlaceList: () => http.get('/radiation/unitManagement/getLedgerDetailsPlaceList'),
  // 台账明细-获取用途
  getLedgerDetailsPurposeList: () => http.get('/radiation/unitManagement/getLedgerDetailsPurposeList'),
  // 台账明细-射线装置获取用途
  getDevicePurposeList: () => http.post('/radiation/common/getDevicePurposeList'),
  // 台账明细-放射源
  getLedgerDetailsRadioactiveSourceList: (params) => http.post('/radiation/unitManagement/getLedgerDetailsRadioactiveSourceList', params),
  // 台账明细-射线装置
  getLedgerDetailsRayDeviceList: (params) => http.post('/radiation/unitManagement/getLedgerDetailsRayDeviceList', params),
  // 台账明细-非密封放射性物质
  getLedgerDetailsUnsealedRadioactiveMaterialList: (params) => http.post('/radiation/unitManagement/getLedgerDetailsUnsealedRadioactiveMaterialList', params)
}
