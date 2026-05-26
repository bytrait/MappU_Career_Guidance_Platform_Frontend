import { useTenant } from '../context/TenantContext'

export default function DynamicRoute({ resolve, pageKey }) {
  const tenant = useTenant()

  const Component = resolve(pageKey, tenant)

  return <Component />
}