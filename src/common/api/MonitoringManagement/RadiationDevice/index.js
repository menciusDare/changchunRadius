import http, {FormHttp} from '../../http'
export default {
    // /supervisionManagement/getRadiationList
  // 辐射装置管理-列表
  getRadiationList: (params) => FormHttp.post('manager/supervisionManagement/getRadiationList', params),
  // 辐射装置管理-添加
  saveRadiation: (params) => http.post('manager/supervisionManagement/saveRadiation', params),
  // 辐射装置管理-更新
  updateRadiation: (params) => http.post('manager/supervisionManagement/updateRadiation', params),
  // 辐射装置管理-删除
  deleteRadiation: (params) => http.delete('manager/supervisionManagement/deleteRadiation', params),
  // 辐射装置管理-详情   /supervisionManagement/getRadiationById
  getRadiationById: (params) => FormHttp.post('manager/supervisionManagement/getRadiationById', params),
}
