import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import navigation from './modules/navigation'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    navigation,
    user
  },
  strict: process.env.NODE_ENV !== 'production'
})
