// 监测仪器和防护用品
import http, { FormHttp } from '../../http'

export default {
  /* 公用 */
  // 监测仪器和防护用品-监测仪器
  getMonitoringInstrumentList: (params) => http.get('/radiation/unitManagement/getMonitoringInstrumentList', params),
  // 监测仪器和防护用品-防护用品
  getProtectiveEquipmentList: (params) => FormHttp.post('/radiation/unitManagement/getProtectiveEquipmentList', params)
}
