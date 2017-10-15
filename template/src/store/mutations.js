export default {
  showAlert (state, payload) {
    state.alert = payload
    state.alert.show = true
  },
  closeAlert (state) {
    state.alert.show = false
  },
  getAllUsers (state, payload) {
    state.users = []
    payload.forEach((user) => {
      let u = user.val()
      u.id = user.key
      state.users.push(u)
    })
  }
}
