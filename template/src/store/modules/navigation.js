import config from '@/config'
import buildMenu from '@/config/menu'

const state = {
  pageTitle: null,
  mainNav: null,
  secondaryNav: null,
  showSidebar: true
}

const mutations = {
  setPageTitle (state, payload) {
    state.pageTitle = payload
    if (payload) {
      document.title = `${payload} | ${config.title}`
    }
  },
  setMainNav (state) {
    state.mainNav = buildMenu()
  },
  setSecondaryNav (state, payload) {
    state.secondaryNav = payload
  },
  toggleSidebar (state, payload) {
    state.showSidebar = !state.showSidebar
  },
  showSidebar (state, payload) {
    state.showSidebar = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
