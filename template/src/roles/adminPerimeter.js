import BasePerimeter from './BasePerimeter'

export default new BasePerimeter({
  purpose: 'admin',

  can: {
    route () {
      return this.isAdmin()
    }
  }
})
