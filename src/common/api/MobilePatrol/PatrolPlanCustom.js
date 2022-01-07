/* 移动巡查 */
import http, { FormHttp } from '../http'

export default {
  /* 移动巡查 */
  // 用户类型列表
  getUserTypeList: () => http.post('/manager/mobilePatrolManagement/getUserTypeList'),

  // 巡查计划定制列表
  getCycleTaskList: (params) => http.post('/manager/mobilePatrolManagement/getCycleTaskList', params),
  // 巡查计划定制-详情
  getCycleTaskById: (params) => FormHttp.post('/manager/mobilePatrolManagement/getCycleTaskById', params),
  // 巡查计划定制-修改
  updateSysCycle: (params) => http.post('/manager/mobilePatrolManagement/updateSysCycle', params),
  // 巡查计划定制-添加
  saveSysCycle: (params) => http.post('/manager/mobilePatrolManagement/saveSysCycle', params),
  // 巡查计划定制-删除
  deleteSysCycle: (params) => FormHttp.post('/manager/mobilePatrolManagement/deleteSysCycle', params),
}
