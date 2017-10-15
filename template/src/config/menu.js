import store from '@/store'
import child from '@/roles/child'
import { createSandbox } from 'vue-kindergarten'
import adminPerimeter from '@/roles/adminPerimeter'

const menu = [
  {
    name: 'Portfolio',
    link: { name: 'portfolio' },
    icon: 'credit_card'
  },
  {
    name: 'Projects',
    link: { name: 'projects' },
    icon: 'work'
  },
  {
    name: 'WBS',
    link: { name: 'wbs' },
    icon: 'device_hub'
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
      },
      {
        name: 'Announcements',
        link: { name: 'admin-announcements' },
        icon: 'announcement'
      },
      {
        name: 'Data Import',
        link: { name: 'data-import' },
        icon: 'cloud_download'
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
