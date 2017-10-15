import db from '@/firebase/db'

export default {
  getAllUsers ({ commit, state }, payload) {
    db.ref('/users').on('value', (snapshot) => {
      commit('getAllUsers', snapshot)
    })
  }
}
