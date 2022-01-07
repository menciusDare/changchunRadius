import http, {FormHttp} from '../../http'
export default {
  // 监测设备管理-列表    
  getEquipmentList: (params) => FormHttp.post('manager/supervisionManagement/getEquipmentList', params),
  //监测设备管理-添加
  saveEquipment: (params) => http.post('manager/supervisionManagement/saveEquipment', params),
  //监测设备管理-删除
  deleteEquipment: (params) => http.delete('manager/supervisionManagement/deleteEquipment', params),
  //监测设备管理-更新
  updateEquipment: (params) => http.post('manager/supervisionManagement/updateEquipment', params),
  // 监测设备管理 - 设备类型  /supervisionManagement/getEquipmentTypes
  getEquipmentTypes: () => http.post('manager/supervisionManagement/getEquipmentTypes'),
  // 监测设备管理 - 辐射装置名称  /supervisionManagement/getRadiations
  getRadiations: () => http.post('manager/supervisionManagement/getRadiations'),
  //监测设备管理-根据名称查位置及单位    /supervisionManagement/getUnitLocationByRadiation
  getUnitLocationByRadiation: (params) => FormHttp.post('manager/supervisionManagement/getUnitLocationByRadiation', params),
  // 监测设备管理 -详情  /supervisionManagement/getEquipmentById
  getEquipmentById: (params) => FormHttp.post('manager/supervisionManagement/getEquipmentById', params),
}