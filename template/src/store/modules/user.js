import Vue from 'vue'
import db from '@/firebase/db'
import firebase from 'firebase'
import { isEmpty } from 'lodash/lang'
import { getPlanById } from '@/plans'

const state = {
  organization: null,
  billing: {},
  profile: {},
  authFirstCheck: true,
  preferences: {
    currencyConversion: null,
    currencyFormat: null,
    dateFormat: null
  }
}

const getters = {
  userPlan (state, payload) {
    return getPlanById(state.billing.plan)
  }
}

const mutations = {
  setProfile (state, payload) {
    if (payload) {
      // Don't assign payload directly otherwise vuex raises error in strict mode
      userProfileProps.forEach(key => {
        Vue.set(state.profile, key, payload[key])
      })
    } else {
      state.profile = {}
    }

    if (state.authFirstCheck) {
      state.authFirstCheck = false
    }
  },
  setPreferences (state, payload) {
    state.preferences = payload
  },
  setBilling (state, payload) {
    state.billing = payload
  },
  setOrganization (state, payload) {
    state.organization = payload
  }
}

const actions = {
  getProfile ({ commit, state, dispatch }, payload) {
    db.ref(`/users/${payload.uid}`).on('value', (snapshot) => {
      const user = snapshot.val()
      commit('setProfile', Object.assign({}, payload, user.profile))
      commit('setBilling', user.billing)
      commit('setOrganization', user.organization)
      commit('navigation/setMainNav', null, { root: true })
      dispatch('organizations/getOrganization', user.organization, { root: true })
    })

    // If it's a login then load preferences
    if (payload.uid && isEmpty(state.profile)) {
      db.ref(`/users/${payload.uid}/preferences`).on('value', (snapshot) => {
        commit('setPreferences', snapshot.val())
      })
    }
  },
  setProfile ({ commit, state }, payload) {
    firebase.auth().currentUser.updateProfile({
      displayName: payload.displayName,
      photoURL: payload.photoURL
    }).then(
      () => {
        console.log('profile updated', payload.displayName, payload)
      },
      (error) => {
        console.warn('cant update profile', error)
      })

    db.ref(`/users/${state.profile.uid}/profile`).update({
      displayName: payload.displayName || null,
      jobTitle: payload.jobTitle || null,
      photoURL: payload.photoURL || null
    }).then(() => {
      commit('setProfile', payload)
    })
  },
  setPreferences ({ commit, state }, payload) {
    db.ref(`/users/${state.profile.uid}/preferences`)
        .update(payload)
        .then(() => {
          commit('setPreferences', Object.assign({}, state.preferences, payload))
        })
  }
}

const userProfileProps = [
  'displayName',
  'email',
  'emailVerified',
  'isAnonymous',
  'jobTitle',
  'phoneNumber',
  'photoURL',
  'providerData',
  'providerId',
  'refreshToken',
  'role',
  'uid'
]

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
