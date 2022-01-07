import http, {FormHttp} from '../../http'
export default {
  // 许可证延续申请查询
  getContinueLicenseApplyList: (params) => http.post('manager//licenseManagement/getLicenseApplyList', params),
  
}