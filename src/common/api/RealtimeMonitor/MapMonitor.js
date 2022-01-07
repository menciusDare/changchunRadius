import http, {FormHttp} from '../http'
export default {
  // 地图监测
  getMapUnitList: (params) => http.post('radiation/map/getMapUnitList', params),
  // 加载种类和范围
  getActiveCategory: () => FormHttp.post('radiation/map/getActiveCategory'),
  getMapUnitInfo: (params) => FormHttp.post('radiation/map/getMapUnitInfo', params)
}
