// 获取污染物列表
import http, { FormHttp } from './http'

export default {
  queryPollutantList: () => FormHttp.post('manager/common/queryPollutantList'),
  queryTAttachmentConfig: (params) => FormHttp.post('manager/common/queryTAttachmentConfig', params),
  queryApplyReasonInfo: () => FormHttp.post('manager/common/queryApplyResonInfoList'),
  queryEnterpriseBaseInfo: (queryParam) => http.get(`manager/enterprise/selectEnterprise/${queryParam}`),
  queryIndustryList: () => http.get('manager/common/queryIndustryList'),

  /* 发证机关 */
  getLicenseAuthoritys: () => FormHttp.post('manager/common/getLicenseAuthoritys'),
  // 查询核素信息 /common/getNuclideInfos
  getNuclideInfos: (params) => http.post('manager/common/getNuclideInfos',params),
  // 查询行业分类 /common/getIndustryCategories
  getIndustryCategories: () => http.post('manager/common/getIndustryCategories'),
  // 查询射线装备用途  /common/getDevicePurposeList
  getDevicePurposeList: () => http.post('manager/common/getDevicePurposeList'),
  // 查询区域  /common/getRegions
  getRegions: () => http.post('manager/common/getRegions'),
  // 缺失类型
  getMissingTypes: () => http.post('manager/common/getMissingTypes'),
  // 涉源单位   /common/getUnitInfoList
  // getUnitInfoList: () => http.get('manager/common/getUnitInfoList'),
  // 报警类型
  getAlarmTypes: () => FormHttp.post('/manager/common/getAlarmTypes'),
  // 涉源单位   /common/getUnitInfoList
  getUnitInfoList: (params) => http.get('manager/common/getUnitInfoList',params),
  // 监控位置         /common/getMonitoringLocations
  getMonitoringLocations: () => http.post('manager/common/getMonitoringLocations'),
  // 放射源用途查询   /useOfRadiationSource/getRadiativeResourcePurposes
  getRadiativeResourcePurposes: (params)=> FormHttp.post('manager/useOfRadiationSource/getRadiativeResourcePurposes',params)
}
