export default {
  getAllUsers (state, payload) {
    state.users = []
    payload.forEach((user) => {
      let u = user.val()
      u.id = user.key
      state.users.push(u)
    })
  }
}
