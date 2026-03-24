import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'

export default function Navbar() {
  const { isAuthenticated, isAdmin, isEditor, user, logout } = useAuth()
  const { itemCount, setIsOpen } = useCart()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `text-xs uppercase tracking-widest transition-colors duration-200 font-body font-medium ${
      isActive ? 'text-gold-400' : 'text-stone-400 hover:text-stone-100'
    }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cellar-950/95 backdrop-blur-md border-b border-stone-800/60 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-2xl text-gold-400 group-hover:text-gold-300 transition-colors">
              Vinacoteca
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-body">
              Vins · Cerveses · Artesanals
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/cataleg" className={navLinkClass}>Catàleg</NavLink>
            {isEditor && (
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            )}
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={navLinkClass}>Iniciar Sessió</NavLink>
                <NavLink to="/registre" className={navLinkClass}>
                  <span className="border border-gold-500/40 text-gold-400 px-4 py-1.5 rounded hover:bg-gold-500/10 transition-colors">
                    Registrar-se
                  </span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/perfil" className={navLinkClass}>
                  <span className="flex items-center gap-2">
                    {user?.imatge ? (
                      <img
                        src={
                          user.imatge.startsWith('http')
                            ? user.imatge
                            : `${API_BASE}/${user.imatge}`
                        }
                        alt={user.nombre}
                        className="w-6 h-6 rounded-full object-cover border border-stone-700"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-burgundy-800 flex items-center justify-center text-xs text-gold-400">
                        {user?.nombre?.[0]?.toUpperCase() || '?'}
                      </span>
                    )}
                    Perfil
                  </span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-100 transition-colors font-body font-medium"
                >
                  Sortir
                </button>
              </>
            )}

            {/* Cart button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 text-stone-300 hover:text-gold-400 transition-colors"
              aria-label="Obrir carret"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-gradient text-cellar-950 text-[10px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-stone-300 hover:text-gold-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold-gradient text-cellar-950 text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-stone-300 hover:text-stone-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-cellar-900/98 backdrop-blur-md border-t border-stone-800/60 px-6 py-6 flex flex-col gap-5">
            <MobileLink to="/cataleg" onClick={() => setMenuOpen(false)}>Catàleg</MobileLink>
            {isEditor && (
              <MobileLink to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</MobileLink>
            )}
            {!isAuthenticated ? (
              <>
                <MobileLink to="/login" onClick={() => setMenuOpen(false)}>Iniciar Sessió</MobileLink>
                <MobileLink to="/registre" onClick={() => setMenuOpen(false)}>Registrar-se</MobileLink>
              </>
            ) : (
              <>
                <MobileLink to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</MobileLink>
                <button
                  onClick={handleLogout}
                  className="text-left text-xs uppercase tracking-widest text-stone-400 hover:text-stone-100 transition-colors font-body font-medium"
                >
                  Sortir
                </button>
              </>
            )}
          </div>
        )}
      </header>
    </>
  )
}

function MobileLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-xs uppercase tracking-widest font-body font-medium transition-colors ${
          isActive ? 'text-gold-400' : 'text-stone-400 hover:text-stone-100'
        }`
      }
    >
      {children}
    </NavLink>
  )
}
