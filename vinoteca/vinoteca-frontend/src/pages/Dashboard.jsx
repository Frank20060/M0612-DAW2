import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { vinosAPI, cervesesAPI, usuarisAPI } from '../api/axios'
import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'
const toastStyle = {
  background: '#1e1118', color: '#e7e5e4', border: '1px solid #3d2133',
  fontFamily: '"DM Sans", sans-serif', fontSize: '14px',
}

const EMPTY_PRODUCT = {
  nombre: '', descripcion: '', precio: '', stock: '', graduacion: '',
  detalles: { tipo: '', origen: '', anyada: '', maridatge: '' },
}

export default function Dashboard() {
  const { user, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('productes')

  // Products state
  const [vinos, setVinos] = useState([])
  const [cerveses, setCerveses] = useState([])
  const [loadingProds, setLoadingProds] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null) // null = create
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT)
  const [productTipo, setProductTipo] = useState('Vino')
  const [savingProd, setSavingProd] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  // Users state (admin only)
  const [usuaris, setUsuaris] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [updatingRol, setUpdatingRol] = useState(null)

  // ── Load products ──────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoadingProds(true)
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
      } catch { /* silent */ }
      finally { setLoadingProds(false) }
    }
    load()
  }, [])

  // ── Load users (admin only) ────────────────────────────────────────────────
  useEffect(() => {
    if (activeTab === 'usuaris' && isAdmin && usuaris.length === 0) {
      const load = async () => {
        setLoadingUsers(true)
        try {
          const { data } = await usuarisAPI.getAll()
          setUsuaris(Array.isArray(data) ? data : data.usuaris || data.users || data.data || [])
        } catch (err) {
          toast.error('Error en carregar usuaris', { style: toastStyle })
        } finally { setLoadingUsers(false) }
      }
      load()
    }
  }, [activeTab, isAdmin])

  // ── Product Modal ──────────────────────────────────────────────────────────
  const openCreate = (tipo = 'Vino') => {
    setEditingProduct(null)
    setProductForm(EMPTY_PRODUCT)
    setProductTipo(tipo)
    setImageFile(null)
    setShowModal(true)
  }

  const openEdit = (product, tipo) => {
    setEditingProduct(product)
    setProductTipo(tipo)
    setProductForm({
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio ?? '',
      stock: product.stock ?? '',
      graduacion: product.graduacion || '',
      detalles: {
        tipo: product.detalles?.tipo || '',
        origen: product.detalles?.origen || '',
        anyada: product.detalles?.anyada || '',
        maridatge: product.detalles?.maridatge || '',
      },
    })
    setImageFile(null)
    setShowModal(true)
  }

  const handleFormChange = (field, value) => {
    setProductForm((p) => ({ ...p, [field]: value }))
  }

  const handleDetallesChange = (field, value) => {
    setProductForm((p) => ({ ...p, detalles: { ...p.detalles, [field]: value } }))
  }

  const handleSaveProduct = async () => {
    if (!productForm.nombre.trim()) {
      toast.error('El nom és obligatori', { style: toastStyle })
      return
    }
    setSavingProd(true)
    const api = productTipo === 'Vino' ? vinosAPI : cervesesAPI
    const payload = {
      ...productForm,
      precio: parseFloat(productForm.precio) || 0,
      stock: parseInt(productForm.stock) || 0,
      graduacion: parseFloat(productForm.graduacion) || 0,
    }

    try {
      let saved
      if (editingProduct) {
        const { data } = await api.update(editingProduct._id, payload)
        saved = data.vino || data.cervesa || data.producte || data
        // Update image if provided
        if (imageFile) {
          const fd = new FormData()
          fd.append('imatge', imageFile)
          await api.uploadImatge(editingProduct._id, fd)
        }
        toast.success('Producte actualitzat', { style: toastStyle })
      } else {
        const { data } = await api.create(payload)
        saved = data.vino || data.cervesa || data.producte || data
        // Upload image if provided
        if (imageFile && saved._id) {
          const fd = new FormData()
          fd.append('imatge', imageFile)
          await api.uploadImatge(saved._id, fd)
          saved.imatge = 'pendent...'
        }
        toast.success('Producte creat', { style: toastStyle })
      }

      // Refresh lists
      const refreshed = await api.getAll()
      const d = refreshed.data
      const list = Array.isArray(d) ? d : d.vinos || d.cervesas || d.cerveses || d.data || []
      if (productTipo === 'Vino') setVinos(list)
      else setCerveses(list)

      setShowModal(false)
    } catch (err) {
      const msg = err.response?.data?.mensaje || err.response?.data?.error || 'Error en desar'
      toast.error(msg, { style: toastStyle })
    } finally {
      setSavingProd(false)
    }
  }

  const handleDelete = async (product, tipo) => {
    if (!window.confirm(`Eliminar "${product.nombre}"? Aquesta acció no es pot desfer.`)) return
    const api = tipo === 'Vino' ? vinosAPI : cervesesAPI
    setDeletingId(product._id)
    try {
      await api.delete(product._id)
      if (tipo === 'Vino') setVinos((p) => p.filter((v) => v._id !== product._id))
      else setCerveses((p) => p.filter((c) => c._id !== product._id))
      toast.success('Producte eliminat', { style: toastStyle })
    } catch (err) {
      toast.error('Error en eliminar', { style: toastStyle })
    } finally { setDeletingId(null) }
  }

  // ── Role change ────────────────────────────────────────────────────────────
  const handleRolChange = async (userId, newRol) => {
    setUpdatingRol(userId)
    try {
      await usuarisAPI.updateRol(userId, newRol)
      setUsuaris((prev) => prev.map((u) => u._id === userId ? { ...u, rol: newRol } : u))
      toast.success('Rol actualitzat', { style: toastStyle })
    } catch (err) {
      toast.error('Error en canviar el rol', { style: toastStyle })
    } finally { setUpdatingRol(null) }
  }

  // ── Tabs config ────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'productes', label: 'Productes' },
    ...(isAdmin ? [{ id: 'usuaris', label: 'Usuaris' }] : []),
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 page-enter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-500/70 font-body mb-2">
            {isAdmin ? 'Administrador' : 'Editor'}
          </p>
          <h1 className="section-title mb-1">Dashboard</h1>
          <div className="gold-line" />
          <p className="text-stone-400 font-body text-sm mt-1">
            Benvingut, {user?.nombre}. Gestiona el catàleg{isAdmin ? ' i els usuaris' : ''}.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Vins" value={vinos.length} icon="🍷" />
          <StatCard label="Cerveses" value={cerveses.length} icon="🍺" />
          <StatCard label="Total Productes" value={vinos.length + cerveses.length} icon="📦" />
          {isAdmin && <StatCard label="Usuaris" value={usuaris.length || '—'} icon="👥" />}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-800/60 mb-8 gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs uppercase tracking-widest font-body font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'text-gold-400 border-gold-500'
                  : 'text-stone-500 border-transparent hover:text-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB: Productes ── */}
        {activeTab === 'productes' && (
          <div className="space-y-10">
            {/* Vins section */}
            <ProductSection
              title="Vins"
              emoji="🍷"
              products={vinos}
              tipo="Vino"
              loading={loadingProds}
              deletingId={deletingId}
              onEdit={(p) => openEdit(p, 'Vino')}
              onDelete={(p) => handleDelete(p, 'Vino')}
              onAdd={() => openCreate('Vino')}
            />

            {/* Cerveses section */}
            <ProductSection
              title="Cerveses"
              emoji="🍺"
              products={cerveses}
              tipo="Cerveza"
              loading={loadingProds}
              deletingId={deletingId}
              onEdit={(p) => openEdit(p, 'Cerveza')}
              onDelete={(p) => handleDelete(p, 'Cerveza')}
              onAdd={() => openCreate('Cerveza')}
            />
          </div>
        )}

        {/* ── TAB: Usuaris (admin) ── */}
        {activeTab === 'usuaris' && isAdmin && (
          <div>
            {loadingUsers ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}
              </div>
            ) : usuaris.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-2xl text-stone-400">Cap usuari trobat</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-stone-800/60">
                      {['Usuari', 'Email', 'Rol Actual', 'Canviar Rol', ''].map((h) => (
                        <th key={h} className="text-left py-3 px-4 text-[10px] uppercase tracking-widest text-stone-500 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/40">
                    {usuaris.map((u) => (
                      <tr key={u._id} className="hover:bg-cellar-900/40 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-burgundy-900/60 flex items-center justify-center text-xs text-gold-400 font-display flex-shrink-0">
                              {u.nombre?.[0]?.toUpperCase() || '?'}
                            </div>
                            <span className="text-stone-200 font-medium">{u.nombre || '—'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-stone-400">{u.email}</td>
                        <td className="py-4 px-4">
                          <RolBadge rol={u.rol} />
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={u.rol || 'usuari'}
                            onChange={(e) => handleRolChange(u._id, e.target.value)}
                            disabled={updatingRol === u._id}
                            className="input-field text-xs py-1.5 w-auto pr-8 disabled:opacity-50"
                          >
                            <option value="usuari">Usuari</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          {updatingRol === u._id && (
                            <span className="w-4 h-4 border-2 border-stone-700 border-t-gold-500 rounded-full animate-spin inline-block" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Product Modal ── */}
      {showModal && (
        <ProductModal
          editing={editingProduct}
          tipo={productTipo}
          form={productForm}
          saving={savingProd}
          onFormChange={handleFormChange}
          onDetallesChange={handleDetallesChange}
          onImageChange={(f) => setImageFile(f)}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ label, value, icon }) {
  return (
    <div className="glass-panel p-5 flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-display text-2xl text-stone-100">{value}</p>
        <p className="text-[10px] uppercase tracking-widest text-stone-500 font-body">{label}</p>
      </div>
    </div>
  )
}

function ProductSection({ title, emoji, products, tipo, loading, deletingId, onEdit, onDelete, onAdd }) {
  const imgSrc = (p) => {
    if (!p.imatge) return null
    return p.imatge.startsWith('http') ? p.imatge : `${API_BASE}/${p.imatge}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-2xl text-stone-100">
          {emoji} {title}
          <span className="ml-2 text-base text-stone-500">({products.length})</span>
        </h2>
        <button onClick={onAdd} className="btn-primary text-xs py-2">
          + Nou {tipo === 'Vino' ? 'Vi' : 'Cervesa'}
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="glass-panel p-8 text-center border-dashed">
          <p className="text-stone-500 font-body text-sm">No hi ha {title.toLowerCase()} al catàleg</p>
          <button onClick={onAdd} className="btn-ghost text-xs mt-4">Afegir el primer</button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-stone-800/60">
                {['Producte', 'Preu', 'Stock', 'Graduació', 'Accions'].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-[10px] uppercase tracking-widest text-stone-500 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/40">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-cellar-900/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-cellar-800 flex-shrink-0 overflow-hidden">
                        {imgSrc(p) ? (
                          <img src={imgSrc(p)} alt={p.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">
                            {tipo === 'Vino' ? '🍷' : '🍺'}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-stone-200 font-medium line-clamp-1">{p.nombre}</p>
                        <p className="text-xs text-stone-500 line-clamp-1">{p.descripcion}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gold-400 font-display text-base whitespace-nowrap">
                    {p.precio != null ? `${Number(p.precio).toFixed(2)} €` : '—'}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-sm font-body ${p.stock === 0 ? 'text-stone-500' : p.stock <= 5 ? 'text-amber-400' : 'text-stone-300'}`}>
                      {p.stock ?? '—'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-stone-400">
                    {p.graduacion ? `${p.graduacion}°` : '—'}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(p)}
                        className="text-xs text-stone-400 hover:text-gold-400 transition-colors border border-stone-700 hover:border-gold-500/40 px-3 py-1.5 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(p)}
                        disabled={deletingId === p._id}
                        className="text-xs text-stone-400 hover:text-burgundy-400 transition-colors border border-stone-700 hover:border-burgundy-700/40 px-3 py-1.5 rounded disabled:opacity-40"
                      >
                        {deletingId === p._id ? '…' : 'Eliminar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ProductModal({ editing, tipo, form, saving, onFormChange, onDetallesChange, onImageChange, onSave, onClose }) {
  const tipoLabel = tipo === 'Vino' ? 'Vi' : 'Cervesa'
  const [preview, setPreview] = useState(null)

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Només s\'accepten imatges', { style: toastStyle })
      return
    }
    onImageChange(file)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-cellar-950/85 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg glass-panel p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-stone-100">
            {editing ? `Editar ${tipoLabel}` : `Nou ${tipoLabel}`}
          </h2>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Image */}
          <div>
            <label className="label">Imatge del Producte</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-cellar-800 overflow-hidden flex items-center justify-center text-2xl flex-shrink-0">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  tipo === 'Vino' ? '🍷' : '🍺'
                )}
              </div>
              <label className="btn-ghost text-xs cursor-pointer">
                Seleccionar Imatge
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="label">Nom *</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => onFormChange('nombre', e.target.value)}
              placeholder={tipo === 'Vino' ? 'Ex: Ribera del Duero Reserva' : 'Ex: IPA Artesana del Montseny'}
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Descripció</label>
            <textarea
              rows={3}
              value={form.descripcion}
              onChange={(e) => onFormChange('descripcion', e.target.value)}
              placeholder="Descripció del producte…"
              className="input-field resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Preu (€)</label>
              <input type="number" step="0.01" min="0" value={form.precio}
                onChange={(e) => onFormChange('precio', e.target.value)}
                placeholder="0.00" className="input-field" />
            </div>
            <div>
              <label className="label">Stock</label>
              <input type="number" min="0" value={form.stock}
                onChange={(e) => onFormChange('stock', e.target.value)}
                placeholder="0" className="input-field" />
            </div>
            <div>
              <label className="label">Graduació (°)</label>
              <input type="number" step="0.1" min="0" value={form.graduacion}
                onChange={(e) => onFormChange('graduacion', e.target.value)}
                placeholder="0.0" className="input-field" />
            </div>
          </div>

          {/* Detalles */}
          <div className="border-t border-stone-800/60 pt-4">
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-body mb-3">Detalls Addicionals</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Tipus</label>
                <input type="text" value={form.detalles.tipo}
                  onChange={(e) => onDetallesChange('tipo', e.target.value)}
                  placeholder={tipo === 'Vino' ? 'Negre, Blanc…' : 'IPA, Stout…'}
                  className="input-field text-xs" />
              </div>
              <div>
                <label className="label">Origen</label>
                <input type="text" value={form.detalles.origen}
                  onChange={(e) => onDetallesChange('origen', e.target.value)}
                  placeholder="Catalunya, Rioja…" className="input-field text-xs" />
              </div>
              {tipo === 'Vino' && (
                <>
                  <div>
                    <label className="label">Anyada</label>
                    <input type="text" value={form.detalles.anyada}
                      onChange={(e) => onDetallesChange('anyada', e.target.value)}
                      placeholder="2021" className="input-field text-xs" />
                  </div>
                  <div>
                    <label className="label">Maridatge</label>
                    <input type="text" value={form.detalles.maridatge}
                      onChange={(e) => onDetallesChange('maridatge', e.target.value)}
                      placeholder="Carns vermelles…" className="input-field text-xs" />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onSave} disabled={saving} className="btn-primary flex-1 justify-center py-3 disabled:opacity-60">
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-cellar-950/30 border-t-cellar-950 rounded-full animate-spin" />
                  Desant…
                </>
              ) : editing ? 'Desar Canvis' : 'Crear Producte'}
            </button>
            <button onClick={onClose} className="btn-ghost py-3 px-4">Cancel·lar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RolBadge({ rol }) {
  const map = {
    admin: 'badge-gold',
    editor: 'badge-burgundy',
    usuari: 'badge bg-stone-800/40 text-stone-400 border border-stone-700/40',
  }
  const labels = { admin: 'Admin', editor: 'Editor', usuari: 'Usuari' }
  const cls = map[rol] || map.usuari
  return <span className={cls}>{labels[rol] || rol || 'Usuari'}</span>
}
