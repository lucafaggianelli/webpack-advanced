import store from '@/store'
import child from '@/roles/child'
import { createSandbox } from 'vue-kindergarten'
import adminPerimeter from '@/roles/adminPerimeter'

const menu = [
  {
    name: 'Hello',
    link: { name: 'Hello' },
    icon: 'bubble_chart'
  }
]

const adminMenu = [
  {
    name: 'Admin',
    icon: 'event_seat',
    items: [
      {
        name: 'Settings',
        link: { name: 'admin-settings' },
        icon: 'settings'
      }
    ]
  }
]

export default function buildMenu () {
  const adminSandbox = createSandbox(child(store), {
    perimeters: [
      adminPerimeter
    ]
  })

  if (adminSandbox.isAllowed('route')) {
    return menu.concat(adminMenu)
  } else {
    return menu
  }
}
