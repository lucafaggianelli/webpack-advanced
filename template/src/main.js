{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}

import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{#alacarte}}
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from 'vuetify'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{else}}
import Vuetify from 'vuetify'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/alacarte}}
import config from './config'
{{#firebase}}
import firebase from 'firebase'
import VueFire from 'vuefire'
Vue.use(VueFire)
{{/firebase}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
{{#vuex}}
import store from './store'
{{/vuex}}
{{#vuex}}{{#router}}
// Routing logic
import { sync } from 'vuex-router-sync'
sync(store, router)
{{/router}}{{/vuex}}
{{#alacarte}}
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  }
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{else}}
Vue.use(Vuetify){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/alacarte}}
{{#roles}}
import VueKindergarten from 'vue-kindergarten'
import child from '@/roles/child'

Vue.use(VueKindergarten, { child })
{{/roles}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// Set title to app name
document.title = config.title

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{#firebase}}
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    {{#vuex}}store.dispatch('user/getProfile', user){{/vuex}}
    {{#router}}
    if (router.currentRoute.name === 'login') {
      router.push({
        path: router.currentRoute.query.redirect || '/'
      })
    }{{/router}}
  }
})
{{/firebase}}
