import http, {FormHttp} from '../../http'
export default {
  /* 许可证到期提示 */
  getLicenceExpireTipsList: (params) => http.post('manager/messagePrompt/getLicenceExpireTipsList', params),
  /* 年报缺失提示 */
  getReportMissingRecordList: (params) => http.post('manager/messagePrompt/getReportMissingRecordList', params),
  /* 填报信息缺失提示 */
  getFillMissingTipsList: (params) => http.post('manager/messagePrompt/getFillMissingTipsList', params),

}
