import { PRINT_LAYOUT_REGISTRY, REPORT_LAYOUT_REGISTRY } from './registry'
import { PLAN_RULES } from '../config/planRules'

export function resolveReportLayout(tenant) {
  const code = tenant?.code
  const plan = tenant?.plan || 'basic'
  const rules = PLAN_RULES[plan] || PLAN_RULES.basic

  if (!rules.allowCustomLayout) {
    return REPORT_LAYOUT_REGISTRY.default
  }

  return REPORT_LAYOUT_REGISTRY[code] || REPORT_LAYOUT_REGISTRY.default
}

export function resolvePrintLayout(tenant) {
  const code = tenant?.code
  const plan = tenant?.plan || 'basic'
  const rules = PLAN_RULES[plan] || PLAN_RULES.basic

  if (!rules.allowCustomLayout) {
    return PRINT_LAYOUT_REGISTRY.default
  }

  return PRINT_LAYOUT_REGISTRY[code] || PRINT_LAYOUT_REGISTRY.default
}
