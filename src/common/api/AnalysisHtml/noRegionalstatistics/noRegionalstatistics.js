import http, { LoginHttp, FormHttp } from '../../http'

export default {
  // 核技术利用单位统计
  // 区域统计
  industryclassfun: (params) => http.post('manager/common/getIndustryCategories'), // 行业分类
  issuingauthfun: (params) => http.post('manager/common/getLicenseAuthoritys'), // 发证机关
  tablelist: (params) => http.post('manager/usingUnit/region', params), // 表格数据
  unitstatusfun: (params) => http.get('manager/common/getUnitStatus'), // 单位状态
  regionfun: (params) => http.post('manager/common/getRegions'), // 区域
  // 行业统计
  intablelist: (params) => http.post('manager/usingUnit/industry', params), // 表格数据
  // 变化趋势
  inecharts: (params) => http.post('manager/usingUnit/change', params), // 表格数据
  // 非密封放射性物质统计
  // 区域内场所统计
  Unsealedtablelist: (params) => http.get('manager/nonSealedRadioactiveSources/getRegionMaterialLevelCount', params), // 表格数据
  // 行业统计
  untablelist: (params) => http.get('manager/nonSealedRadioactiveSources/getIndustryStatistics', params), // 表格数据
  // 变化趋势
  unecharts: (params) => http.get('manager/nonSealedRadioactiveSources/getLicenseIssuingTimeCharts', params), // 表格数据

  // 射线装置统计
  // 用途统计
  regtablelist: (params) => http.get('manager/rayApparatus/getDevicePurposeStatistics', params), // 表格数据
  // 行业统计
  reguntablelist: (params) => http.get('manager/rayApparatus/getIndustryDeviceStatistics', params), // 表格数据
  // 变化趋势图
  reecharts: (params) => http.post('manager/rayApparatus/trendInfo', params), // 表格数据

  // 实时一览
  Realtablelist: (params) => http.get('manager/realTime/view/list', params), // 表格数据
  // 获取因子组列表
  Factorgrouplist: (params) => http.get('manager/pollutant/getPollutantGroupList', params), // 表格数据
  // 获取自定义因子组列表
  Customgrouplist: (params) => http.get('manager/pollutant/list', params), // 表格数据
  // 移动巡查统计
  mobtablelist: (params) => http.post('manager/mobilePatrol/getInspectionSituationList', params), // 表格数据
  // 移动变化趋势图
  mobecharts: (params) => http.post('manager/mobilePatrol/trendInfoChart', params), // 表格数据
  // 获取单位类型
  unittype: (params) => http.post('manager/common/getUnitTypes', params), // 表格数据
  // 视频
  getvideo: (params) => http.get('manager/realTime/view/getVideoInfo', params), // 表格数据
  // 获取视频链接的token    /realTime/view/getVideoToken
  getVideoToken: () => http.get('manager/realTime/view/getVideoToken'),
 //移動echarts
 getmobechartshttp:(params) => FormHttp.post('/manager/mobilePatrol/trendInfoChart', params), // 表格数据
//移動巡查表格
getmobtoblehttp:(params) => FormHttp.post('/manager/mobilePatrol/getInspectionSituationList', params), // 表格数据

}
