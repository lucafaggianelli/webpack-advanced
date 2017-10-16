import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import firebase from 'firebase'
import config from '@/config'

function init () {
  Raven
      .config(config.sentry, {
        release: config.version
      })
      .addPlugin(RavenVue, Vue)
      .install()

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Raven.setUserContext({
        id: user.uid,
        username: user.displayName,
        email: user.email
      })
    } else {
      Raven.setUserContext(null)
    }
  })
}

export default init
