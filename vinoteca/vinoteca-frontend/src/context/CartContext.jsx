import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { pedidosAPI } from '../api/axios'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

const toastStyle = {
  background: '#1e1118',
  color: '#e7e5e4',
  border: '1px solid #3d2133',
  fontFamily: '"DM Sans", sans-serif',
  fontSize: '14px',
}

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [items, setItems] = useState([]) // { product, tipo ('Vino'|'Cerveza'), quantity }
  const [isOpen, setIsOpen] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)

  const addItem = useCallback((product, tipo) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product._id === product._id && i.tipo === tipo)
      if (existing) {
        if (existing.quantity >= (product.stock || 99)) {
          toast.error('No hi ha més stock disponible', { style: toastStyle })
          return prev
        }
        return prev.map((i) =>
          i.product._id === product._id && i.tipo === tipo
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, tipo, quantity: 1 }]
    })
    toast.success(`${product.nombre} afegit al carret`, {
      icon: '🛒',
      style: toastStyle,
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId, tipo) => {
    setItems((prev) => prev.filter((i) => !(i.product._id === productId && i.tipo === tipo)))
  }, [])

  const updateQuantity = useCallback((productId, tipo, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.product._id === productId && i.tipo === tipo)))
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product._id === productId && i.tipo === tipo ? { ...i, quantity } : i
      )
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = useMemo(
    () => items.reduce((acc, i) => acc + (i.product.precio || 0) * i.quantity, 0),
    [items]
  )

  const itemCount = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  )

  const checkout = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error('Has d\'iniciar sessió per fer una comanda', { style: toastStyle })
      return { success: false }
    }
    if (items.length === 0) {
      toast.error('El carret és buit', { style: toastStyle })
      return { success: false }
    }

    setCheckingOut(true)
    try {
      const payload = {
        productos: items.map((i) => ({
          producto_id: i.product._id,
          producto_modelo: i.tipo, // "Vino" or "Cerveza"
          cantidad: i.quantity,
        })),
        total: parseFloat(total.toFixed(2)),
      }

      const { data } = await pedidosAPI.create(payload)
      clearCart()
      setIsOpen(false)
      toast.success('Comanda realitzada! Rebràs confirmació per correu.', {
        duration: 5000,
        style: toastStyle,
      })
      return { success: true, data }
    } catch (err) {
      const msg = err.response?.data?.mensaje || err.response?.data?.error || 'Error en processar la comanda'
      toast.error(msg, { style: toastStyle })
      return { success: false, error: msg }
    } finally {
      setCheckingOut(false)
    }
  }, [isAuthenticated, items, total, clearCart])

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        isOpen,
        checkingOut,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
