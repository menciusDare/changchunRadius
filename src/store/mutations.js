import http, {FormHttp} from '@/common/api/http'
import C from '@/common/constants'
import Storage from '@/common/storage'
import {UPDATE_AUTH, CLEAN_AUTH, UPDATE_ENTERPRISESIMPLE} from './mutation-types'

export default {
  [UPDATE_AUTH] (state, auth) {
    if (auth) {
      // console.log(auth, state)
      Storage.set('KEY_USER', auth)
      Storage.set('KEY_SESSION', auth.access_token)
      http.setHeader('Authorization', `Bearer  ${auth.access_token}`)
      FormHttp.setHeader('Authorization', `Bearer  ${auth.access_token}`)
      state.user = auth
    }
  },
  [CLEAN_AUTH] (state) {
    http.removeHeader('Authorization')
    Storage.remove('KEY_USER')
    Storage.remove('KEY_SESSION')
    state.user = {}
  },
  [UPDATE_ENTERPRISESIMPLE] (state, list) {
    state.enterpriseSimple = list
  }
}
