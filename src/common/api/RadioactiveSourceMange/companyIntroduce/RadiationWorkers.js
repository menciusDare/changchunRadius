// 辅助工作人员
import http, { FormHttp } from '../../http'

export default {
  // 辐射工作人员-辐射工作人员
  getRadiationWorkersList: (params) => http.post('manager/unitManagement/getRadiationWorkersList', params),
  // 辐射工作人员-辐射工作人员详细信息
  getRadiationWorkers: (params) => FormHttp.post('manager/unitManagement/getRadiationWorkers', params),
  // 辐射工作人员-辐射安全与安全防护培训记录
  getStaffTrainingRecordList: (params) => FormHttp.post('manager/unitManagement/getStaffTrainingRecordList', params),
  // 辐射工作人员-职业照射个人剂量检测档案
  getStaffPersonalArchivesList: (params) => FormHttp.post('manager/unitManagement/getStaffPersonalArchivesList', params),
  // 辐射工作人员-考试培训记录
  getStaffTestRecordList: (params) => FormHttp.post('manager/unitManagement/getStaffTestRecordList', params),
}
