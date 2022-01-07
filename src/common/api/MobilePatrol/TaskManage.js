/* 移动巡查 */
import http, { FormHttp } from '../http'

export default {
  /* 任务查询 */
  // 巡查任务查询
  getCycleTaskList: (params) => http.post('/manager/taskManagement/getTaskInfoList', params),
  // 巡查任务查询-详情
  getTaskInfoById: (params) => FormHttp.post('/manager/taskManagement/getTaskInfoById', params),
}
