import http, {FormHttp} from '../http'
export default {
  /* 监测因子 */
  pollutantAdd: (params) => http.post('manager/pollutant/add', params),
  pollutantList: (params) => http.get('manager/pollutant/list', params),
  pollutantUpdate: (params) => http.post('manager/pollutant/update', params),
  pollutantRemove: (params) => http.delete('manager/pollutant/remove', params),
  /* 联系人 */
  getGridUserList: (params) => http.get('manager/user/getGridUserList', params),
  /* 核素信息 */
  saveTNuclideInfo: (params) => http.post('manager/dictionary/saveTNuclideInfo', params),
  updateTNuclideInfo: (params) => http.post('manager/dictionary/updateTNuclideInfo', params),
  getTNuclideInfoList: (params) => http.get('manager/dictionary/getTNuclideInfoList', params),
  removeTNuclideInfo: (params) => http.delete('manager/dictionary/removeTNuclideInfo', params),
  /* 监测因子组 */
  editPollutantGroup: (params) => http.post('manager/pollutant/editPollutantGroup', params),
  getPollutantGroupList: (params) => http.get('manager/pollutant/getPollutantGroupList', params),
  removePollutantGroup: (params) => http.delete('manager/pollutant/removePollutantGroup', params),
  detailPollutantGroup: (params) => http.get('manager/pollutant/detailPollutantGroup', params),
}
