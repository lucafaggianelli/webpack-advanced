import { find } from 'lodash'

const allPlans = [
  { id: 'free', name: 'Free', free: true },
  { id: 'pro', name: 'Professional', free: false },
  { id: 'enterprise', name: 'Enterprise', free: false }
]

export function getPlanById (id) {
  return find(allPlans, ['id', id]) || { }
}

export default allPlans
