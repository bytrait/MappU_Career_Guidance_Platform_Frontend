import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createAppRouter } from './routes'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Provider } from 'react-redux'
import { store } from './store'
import './styles/print.css'
import { Toaster } from 'sonner'
import { TenantProvider, useTenant } from './context/TenantContext'
import { setFavicon } from './utils/favicon'
import { fetchTenant } from './services/tenantService'
import {
  DEFAULT_TENANT_SLUG,
  getSlugFromPath,
} from './utils/tenantSlug'

const slug = getSlugFromPath()
let tenant
try {
  tenant = await fetchTenant(slug)
} catch (err) {
  console.error('Tenant load failed, using ByTrait defaults', err)
  tenant = {
    code: DEFAULT_TENANT_SLUG,
    name: 'ByTrait',
    plan: 'basic',
    theme: { favicon: '/favicons/bytrait.svg' },
    customization: {},
  }
}

const basename = `/${tenant.code || slug || DEFAULT_TENANT_SLUG}`
const router = createAppRouter(basename)

function AppWrapper({ children }) {
  const currentTenant = useTenant()

  useEffect(() => {
    const favicon =
      currentTenant?.theme?.favicon || '/favicons/bytrait.svg'
    setFavicon(favicon)

    if (currentTenant?.name) {
      document.title = currentTenant.name
    }
  }, [currentTenant])

  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TenantProvider tenant={tenant}>
      <AppWrapper>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AppWrapper>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '18px',
            padding: '16px',
          },
        }}
      />
    </TenantProvider>
  </StrictMode>
)
