import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const toastStyle = {
  background: '#1e1118', color: '#e7e5e4', border: '1px solid #3d2133',
  fontFamily: '"DM Sans", sans-serif', fontSize: '14px',
}

export default function Registre() {
  const { registro, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '', email: '', password: '', confirmPassword: '', rol: '',
  })
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Només s\'accepten imatges', { style: toastStyle })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imatge no pot superar 5 MB', { style: toastStyle })
      return
    }
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Les contrasenyes no coincideixen', { style: toastStyle })
      return
    }
    if (form.password.length < 6) {
      toast.error('La contrasenya ha de tenir almenys 6 caràcters', { style: toastStyle })
      return
    }

    const formData = new FormData()
    formData.append('nombre', form.nombre)
    formData.append('email', form.email)
    formData.append('password', form.password)
    if (form.rol) formData.append('rol', form.rol)
    if (photo) formData.append('imatge', photo)

    const result = await registro(formData)
    if (result.success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 page-enter">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-burgundy-900/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block font-display text-3xl text-gold-400 hover:text-gold-300 transition-colors mb-6">
            Vinacoteca
          </Link>
          <h1 className="font-display text-4xl text-stone-100 font-light mb-2">Crea el teu compte</h1>
          <p className="text-stone-500 font-body text-sm">Accedeix a comandes i contingut exclusiu</p>
        </div>

        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo upload */}
            <div className="flex flex-col items-center gap-3 pb-4 border-b border-stone-800/60">
              <div className="relative">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gold-500/40"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-cellar-800 border-2 border-dashed border-stone-700 flex items-center justify-center">
                    <svg className="w-8 h-8 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
                <label
                  htmlFor="photo-upload"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center cursor-pointer hover:bg-gold-400 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-cellar-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-stone-500 font-body">
                {photo ? photo.name : 'Foto de perfil (opcional)'}
              </p>
            </div>

            {/* Nombre */}
            <div>
              <label className="label">Nom complet</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Joan Garcia"
                required
                className="input-field"
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">Correu Electrònic</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@exemple.com"
                required
                autoComplete="email"
                className="input-field"
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">Contrasenya</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínim 6 caràcters"
                  required
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="label">Confirmar Contrasenya</label>
              <input
                type={showPass ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeteix la contrasenya"
                required
                className="input-field"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-cellar-950/30 border-t-cellar-950 rounded-full animate-spin" />
                  Creant compte…
                </>
              ) : (
                'Crear Compte'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-800/60 text-center">
            <p className="text-stone-500 font-body text-sm">
              Ja tens compte?{' '}
              <Link to="/login" className="text-gold-400 hover:text-gold-300 transition-colors">
                Inicia sessió
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
