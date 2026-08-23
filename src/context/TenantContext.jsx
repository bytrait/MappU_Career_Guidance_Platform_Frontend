import { createContext, useContext } from 'react'

const TenantContext = createContext({ code: 'default' })

export const useTenant = () => useContext(TenantContext)

export const TenantProvider = ({ children, tenant }) => {
  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  )
} 