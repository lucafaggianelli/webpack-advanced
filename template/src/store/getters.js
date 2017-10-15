import { find } from 'lodash'

export default {
  getUserById: (state, getters) => (id) => {
    return find(state.users, ['id', id]) || null
  }
}
