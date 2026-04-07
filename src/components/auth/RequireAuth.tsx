import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/context/jwt/auth-provider'

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
