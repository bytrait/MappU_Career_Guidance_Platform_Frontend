import { PRINT_LAYOUT_REGISTRY, REPORT_LAYOUT_REGISTRY } from './registry'

import { PLAN_RULES } from '../config/planRules'

export function resolveReportLayout(tenant) {
  const { code, plan } = tenant
  const rules = PLAN_RULES[plan]

  // BASIC → always default
  if (!rules.allowCustomLayout) {
    return REPORT_LAYOUT_REGISTRY.default
  }

  // ADVANCED → allow client layout
  if (rules.allowCustomLayout) {
    return (
      REPORT_LAYOUT_REGISTRY[code] ||
      REPORT_LAYOUT_REGISTRY.default
    )
  }

  // fallback safety
  return REPORT_LAYOUT_REGISTRY.default
}


export function resolvePrintLayout(tenant) {
  const { code, plan } = tenant
  const rules = PLAN_RULES[plan]

  if (!rules.allowCustomLayout) {
    return PRINT_LAYOUT_REGISTRY.default
  }

  return (
    PRINT_LAYOUT_REGISTRY[code] ||
    PRINT_LAYOUT_REGISTRY.default
  )
}