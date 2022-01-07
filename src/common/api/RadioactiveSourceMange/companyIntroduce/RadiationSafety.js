// 辐射安全管理机构
import http, { FormHttp } from '../../http'

export default {
  /* 公用 */
  // 辐射安全管理机构-管理机构
  getRadiationSafetyManagementManagementOrganization: (params) => FormHttp.post('/radiation/unitManagement/getRadiationSafetyManagementManagementOrganization', params),
  // 辐射安全管理机构-管理人员
  getRadiationSafetyManagementManagement: (params) => FormHttp.post('/radiation/unitManagement/getRadiationSafetyManagementManagement', params)
}
