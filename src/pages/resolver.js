import { PAGE_REGISTRY } from './registry'
import { PLAN_RULES } from '../config/planRules'

export function resolvePage(pageKey, tenant) {
  const { code, plan } = tenant
  const rules = PLAN_RULES[plan]

  // BASIC → no customization
  if (!rules.allowCustomLayout) {
    return PAGE_REGISTRY[pageKey].default
  }

  // ADVANCED → allow override
  return (
    PAGE_REGISTRY[pageKey][code] ||
    PAGE_REGISTRY[pageKey].default
  )
}