import http, {FormHttp} from '../http'
export default{
  // 射线装置查询
  getRayDeviceList: (params) => http.post('/manager/informationQuery/getRayDeviceList', params),
  // 非密封性物质查询
  getUnsealedRadioactiveMaterialList: (params) => http.post('/manager/informationQuery/getUnsealedRadioactiveMaterialList', params),
  // 放射源查询
  getSourceInfoList: (params) => http.post('/manager/informationQuery/getSourceInfoList', params),
  // 放射源查询-详情
  getSourceInfoById: (params) => FormHttp.post('/manager/informationQuery/getSourceInfoById', params),
  // 监督检查限期整改逾期企业
  getOverDueInfoList: (params) => FormHttp.post('/manager/supervision/getOverDueInfoList', params),
  // 非密封放射性物质查询-详情
  getUnsealedRadioactiveMaterialById: (params) => FormHttp.post('/manager/informationQuery/getUnsealedRadioactiveMaterialById', params)
}
