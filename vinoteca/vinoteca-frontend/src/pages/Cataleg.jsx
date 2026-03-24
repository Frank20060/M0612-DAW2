import { useState, useEffect, useMemo } from 'react'
import { vinosAPI, cervesesAPI } from '../api/axios'
import ProductCard from '../components/ProductCard'

const FILTERS = ['Tots', 'Vins', 'Cerveses']

export default function Cataleg() {
  const [vinos, setVinos] = useState([])
  const [cerveses, setCerveses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('Tots')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [vR, cR] = await Promise.allSettled([vinosAPI.getAll(), cervesesAPI.getAll()])

        if (vR.status === 'fulfilled') {
          const d = vR.value.data
          setVinos(Array.isArray(d) ? d : d.vinos || d.data || [])
        }
        if (cR.status === 'fulfilled') {
          const d = cR.value.data
          setCerveses(Array.isArray(d) ? d : d.cervesas || d.cerveses || d.data || [])
        }

        if (vR.status === 'rejected' && cR.status === 'rejected') {
          setError('No s\'han pogut carregar els productes. Torna-ho a intentar.')
        }
      } catch {
        setError('Error de connexió. Verifica que el backend està actiu.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const allProducts = useMemo(() => {
    const v = vinos.map((p) => ({ product: p, tipo: 'Vino' }))
    const c = cerveses.map((p) => ({ product: p, tipo: 'Cerveza' }))
    let merged = filter === 'Vins' ? v : filter === 'Cerveses' ? c : [...v, ...c]

    if (search.trim()) {
      const q = search.toLowerCase()
      merged = merged.filter(
        ({ product }) =>
          product.nombre?.toLowerCase().includes(q) ||
          product.descripcion?.toLowerCase().includes(q) ||
          product.detalles?.tipo?.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'price-asc') merged.sort((a, b) => (a.product.precio || 0) - (b.product.precio || 0))
    if (sortBy === 'price-desc') merged.sort((a, b) => (b.product.precio || 0) - (a.product.precio || 0))
    if (sortBy === 'name') merged.sort((a, b) => a.product.nombre?.localeCompare(b.product.nombre))

    return merged
  }, [vinos, cerveses, filter, search, sortBy])

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-500/70 font-body mb-3">
            Col·lecció completa
          </p>
          <h1 className="section-title mb-2">Catàleg</h1>
          <div className="gold-line" />
          <p className="text-stone-400 font-body text-sm mt-2">
            {vinos.length} vins · {cerveses.length} cerveses
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Filter tabs */}
          <div className="flex bg-cellar-900 rounded-lg p-1 border border-stone-800/60 w-fit">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs uppercase tracking-widest px-5 py-2 rounded transition-all duration-200 font-body font-medium ${
                  filter === f
                    ? 'bg-burgundy-800 text-stone-100'
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Cercar productes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-fit text-xs uppercase tracking-wider pr-8"
          >
            <option value="default">Ordenar per…</option>
            <option value="name">Nom A–Z</option>
            <option value="price-asc">Preu ↑</option>
            <option value="price-desc">Preu ↓</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="glass-panel p-6 text-center border-burgundy-800/40 border mb-8">
            <p className="text-stone-400 font-body text-sm">{error}</p>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton h-52 w-full" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                  <div className="skeleton h-8 w-full rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && allProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🔍</span>
            <p className="font-display text-2xl text-stone-400 mb-2">
              {search ? 'Cap resultat per la teva cerca' : 'No hi ha productes disponibles'}
            </p>
            {search && (
              <button onClick={() => setSearch('')} className="btn-ghost text-xs mt-4">
                Esborrar cerca
              </button>
            )}
          </div>
        )}

        {/* Products grid */}
        {!loading && allProducts.length > 0 && (
          <>
            <p className="text-xs text-stone-500 font-body uppercase tracking-widest mb-6">
              {allProducts.length} {allProducts.length === 1 ? 'producte' : 'productes'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map(({ product, tipo }) => (
                <ProductCard
                  key={`${tipo}-${product._id}`}
                  product={product}
                  tipo={tipo}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
