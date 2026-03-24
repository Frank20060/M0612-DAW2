import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../api/axios'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)

  // Verify token on mount
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setInitializing(false)
        return
      }
      try {
        const { data } = await authAPI.getPerfil()
        const userData = data.usuario || data.user || data
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } catch {
        // Token invalid – clear session silently
        clearSession()
      } finally {
        setInitializing(false)
      }
    }
    verifySession()
  }, []) // eslint-disable-line

  const saveSession = useCallback((tokenValue, userData) => {
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(tokenValue)
    setUser(userData)
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await authAPI.login({ email, password })
      const { token: t, usuario, user: u } = data
      const userData = usuario || u || data
      saveSession(t, userData)
      toast.success(`Benvingut, ${userData.nombre || userData.email}!`, {
        style: toastStyle,
      })
      return { success: true, user: userData }
    } catch (err) {
      const msg = err.response?.data?.mensaje || err.response?.data?.error || 'Credencials incorrectes'
      toast.error(msg, { style: toastStyle })
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [saveSession])

  const registro = useCallback(async (formData) => {
    setLoading(true)
    try {
      const { data } = await authAPI.registro(formData)
      const { token: t, usuario, user: u } = data
      const userData = usuario || u || data
      if (t) {
        saveSession(t, userData)
        toast.success('Compte creat! Benvingut/da!', { style: toastStyle })
      } else {
        toast.success('Compte creat! Ara pots iniciar sessió.', { style: toastStyle })
      }
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.mensaje || err.response?.data?.error || 'Error en el registre'
      toast.error(msg, { style: toastStyle })
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [saveSession])

  const logout = useCallback(() => {
    clearSession()
    toast('Sessió tancada', {
      icon: '👋',
      style: toastStyle,
    })
  }, [clearSession])

  const isAuthenticated = Boolean(token && user)
  const isAdmin = user?.rol === 'admin'
  const isEditor = user?.rol === 'editor' || user?.rol === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        initializing,
        isAuthenticated,
        isAdmin,
        isEditor,
        login,
        logout,
        registro,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

const toastStyle = {
  background: '#1e1118',
  color: '#e7e5e4',
  border: '1px solid #3d2133',
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '14px',
}
