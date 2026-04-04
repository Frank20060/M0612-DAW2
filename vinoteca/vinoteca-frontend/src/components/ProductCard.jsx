import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getFullImageUrl } from '../api/axios'
const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'

export default function ProductCard({ product, tipo }) {
  const { addItem } = useCart()
  const [imgError, setImgError] = useState(false)

  const imgSrc =
    product.imatge && !imgError
      ? getFullImageUrl(product.imatge)
      : null

  const tipoLabel = tipo === 'Vino' ? 'Vi' : 'Cervesa'
  const tipoPath = tipo === 'Vino' ? 'vino' : 'cervesa'
  const emoji = tipo === 'Vino' ? '🍷' : '🍺'

  const stockBadge =
    product.stock === 0
      ? { label: 'Esgotat', cls: 'text-stone-500 border-stone-700' }
      : product.stock <= 5
      ? { label: `${product.stock} restants`, cls: 'text-amber-500/80 border-amber-900/40' }
      : null

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <Link to={`/producte/${tipoPath}/${product._id}`}>
        <div className="relative h-52 overflow-hidden bg-cellar-800">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.nombre}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-5xl opacity-40">{emoji}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-600 font-body">{tipoLabel}</span>
            </div>
          )}

          {/* Type badge overlay */}
          <div className="absolute top-3 left-3">
            <span className={`badge text-[9px] uppercase tracking-widest border font-body
              ${tipo === 'Vino' ? 'badge-burgundy' : 'bg-amber-900/30 text-amber-400/80 border-amber-800/30'}`}>
              {tipoLabel}
            </span>
          </div>

          {/* Stock badge */}
          {stockBadge && (
            <div className="absolute top-3 right-3">
              <span className={`badge text-[9px] uppercase tracking-widest border font-body bg-cellar-900/80 ${stockBadge.cls}`}>
                {stockBadge.label}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <Link to={`/producte/${tipoPath}/${product._id}`}>
            <h3 className="font-display text-lg text-stone-100 leading-tight hover:text-gold-400 transition-colors line-clamp-1">
              {product.nombre}
            </h3>
          </Link>
          {product.descripcion && (
            <p className="text-xs text-stone-500 font-body mt-1 line-clamp-2 leading-relaxed">
              {product.descripcion}
            </p>
          )}
        </div>

        {/* Details row */}
        {product.graduacion && (
          <div className="flex gap-3">
            <span className="text-[10px] text-stone-500 font-body uppercase tracking-wider">
              {product.graduacion}° alc.
            </span>
            {product.detalles?.tipo && (
              <span className="text-[10px] text-stone-500 font-body uppercase tracking-wider border-l border-stone-800 pl-3">
                {product.detalles.tipo}
              </span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-800/60">
          <span className="font-display text-2xl text-gold-400">
            {product.precio != null ? `${Number(product.precio).toFixed(2)} €` : '—'}
          </span>
          <button
            onClick={() => addItem(product, tipo)}
            disabled={product.stock === 0}
            className="btn-ghost text-xs py-2 px-4 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Esgotat' : 'Afegir'}
          </button>
        </div>
      </div>
    </div>
  )
}
