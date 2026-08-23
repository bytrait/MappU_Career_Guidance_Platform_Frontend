import { PAGE_REGISTRY } from './registry'
import { PLAN_RULES } from '../config/planRules'

export function resolvePage(pageKey, tenant) {
  const code = tenant?.code
  const plan = tenant?.plan || 'basic'
  const rules = PLAN_RULES[plan] || PLAN_RULES.basic
  const pages = PAGE_REGISTRY[pageKey] || {}

  // BASIC → no customization
  if (!rules.allowCustomLayout) {
    return pages.default
  }

  // ADVANCED → allow override
  return pages[code] || pages.default
}