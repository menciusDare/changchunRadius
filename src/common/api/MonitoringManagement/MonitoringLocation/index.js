import http, {FormHttp} from '../../http'
export default {
  // 监测位置管理-列表
  getTBasMonitoringLocationList: (params) => http.get('manager/supervisionManagement/getTBasMonitoringLocationList', params),
  // 监测位置管理-删除
  deleteMonitoringLocation: (params) => http.delete('manager/supervisionManagement/removeMonitoringLocation', params),
  // 监测位置管理-添加
  saveMonitoringLocation: (params) => http.post('manager/supervisionManagement/saveMonitoringLocation', params),
  // 监测位置管理-更新
  updateMonitoringLocation: (params) => http.post('manager/supervisionManagement/updateMonitoringLocation', params)
}
