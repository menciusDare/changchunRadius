/* 移动巡查 */
import http, { FormHttp } from '../http'

export default {
  /* 报警查询 */
  // 报警查询列表
  getCycleTaskList: (params) => http.post('/manager/alarmQuery/getAlarmQueryList', params),
  // 报警查询导出
  exporAlarmQuery: 'alarmQuery/exporAlarmQuery',
}
