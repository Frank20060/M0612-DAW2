import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'

export default function CartDrawer() {
  const { items, total, isOpen, setIsOpen, removeItem, updateQuantity, checkout, checkingOut, itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setIsOpen(false)
      navigate('/login')
      return
    }
    await checkout()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-cellar-950/80 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col
          bg-cellar-900 border-l border-stone-800/60
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800/60">
          <div>
            <h2 className="font-display text-2xl text-stone-100">Carret</h2>
            <p className="text-xs text-stone-500 font-body mt-0.5 uppercase tracking-widest">
              {itemCount} {itemCount === 1 ? 'article' : 'articles'}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-stone-400 hover:text-stone-100 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl">🍷</span>
              <p className="font-display text-xl text-stone-400">El carret és buit</p>
              <p className="text-xs text-stone-500 font-body">Afegeix vins o cerveses des del catàleg</p>
              <button
                onClick={() => { setIsOpen(false); navigate('/cataleg') }}
                className="btn-ghost text-xs mt-2"
              >
                Veure catàleg
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.product._id}-${item.tipo}`}
                item={item}
                onRemove={() => removeItem(item.product._id, item.tipo)}
                onQuantityChange={(q) => updateQuantity(item.product._id, item.tipo, q)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-800/60 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-body">Total</span>
              <span className="font-display text-3xl text-gold-400">{total.toFixed(2)} €</span>
            </div>

            {!isAuthenticated && (
              <p className="text-xs text-stone-500 font-body text-center">
                Has d'iniciar sessió per finalitzar la compra
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn-primary w-full justify-center text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkingOut ? (
                <>
                  <span className="w-4 h-4 border-2 border-cellar-950/30 border-t-cellar-950 rounded-full animate-spin" />
                  Processant…
                </>
              ) : isAuthenticated ? (
                'Finalitzar Compra'
              ) : (
                'Iniciar Sessió per Comprar'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

function CartItem({ item, onRemove, onQuantityChange }) {
  const { product, tipo, quantity } = item
  const imgSrc = product.imatge
    ? product.imatge.startsWith('http')
      ? product.imatge
      : `${API_BASE}/${product.imatge}`
    : null

  return (
    <div className="flex gap-3 p-3 bg-cellar-800/50 rounded-lg border border-stone-800/40">
      {/* Image */}
      <div className="w-16 h-16 rounded bg-cellar-700 flex-shrink-0 overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={product.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            {tipo === 'Vino' ? '🍷' : '🍺'}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-stone-200 text-sm truncate">{product.nombre}</p>
        <p className="text-[10px] uppercase tracking-wider text-stone-500 font-body mb-2">{tipo}</p>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              className="w-6 h-6 rounded border border-stone-700 text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-colors flex items-center justify-center text-sm"
            >−</button>
            <span className="text-sm font-body text-stone-200 w-4 text-center">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-6 h-6 rounded border border-stone-700 text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-colors flex items-center justify-center text-sm"
            >+</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-body font-medium text-gold-400 text-sm">
              {((product.precio || 0) * quantity).toFixed(2)} €
            </span>
            <button
              onClick={onRemove}
              className="text-stone-600 hover:text-burgundy-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
