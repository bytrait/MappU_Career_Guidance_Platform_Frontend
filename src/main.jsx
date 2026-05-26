import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './index.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import { store } from "./store";
import './styles/print.css';
import { Toaster } from 'sonner';
import { TenantProvider, useTenant } from './context/TenantContext';
import { setFavicon } from './utils/favicon';

const tenant = {
  code: "default", // mappu | default
  plan: "advanced", // basic | advanced | enterprise
  theme: {
    logo: "...",
    favicon: "/favicons/bytrait.svg"
  }
}

function AppWrapper({ children }) {
  const tenant = useTenant()

  useEffect(() => {
    const favicon =
      tenant?.theme?.favicon || "/favicons/default.ico"

    setFavicon(favicon)
  }, [tenant])

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
  </StrictMode>,
)
