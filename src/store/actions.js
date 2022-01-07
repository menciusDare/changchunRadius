import Auth from '@/common/api/auth'
import { UPDATE_AUTH, CLEAN_AUTH, UPDATE_ENTERPRISESIMPLE} from './mutation-types'
import {LoginHttp} from '@/common/api/http'
import MapMonitor from '../common/api/RealtimeMonitor/MapMonitor'
export default {
  SIGN_IN ({ commit }, params) {
    LoginHttp.setHeader('Authorization', 'Basic dGFscm9hZDp0YWxyb2Fk')
    return Auth.signIn(params).then(resp => {
      commit(UPDATE_AUTH, resp.data)
      return resp
    })
  },
  SIGN_OUT ({ commit }) {
    return Auth.signOut().then(resp => {
      commit(CLEAN_AUTH)
      return resp
    })
  },
  GET_ENTERPRISE_SIMPLE ({ commit }) {
    return Auth.getEnterpriseSimple().then(resp => {
      console.log(resp)
      commit(UPDATE_ENTERPRISESIMPLE, resp.data)
      return resp
    })
  }
}
