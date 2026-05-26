// src/reports/registry.js
import DefaultReportLayout from './default/ReportLayout'
import DefaultPrintLayout from './default/PrintLayout'

import MapauReportLayout from './mappu/ReportLayout'
import MapauPrintLayout from './mappu/PrintLayout'

export const REPORT_LAYOUT_REGISTRY = {
  default: DefaultReportLayout,
  mappu: MapauReportLayout,
}

export const PRINT_LAYOUT_REGISTRY = {
  default: DefaultPrintLayout,
  mappu: MapauPrintLayout
}