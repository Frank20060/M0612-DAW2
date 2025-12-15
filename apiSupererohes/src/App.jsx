import { useState } from 'react'

function App() {
  // Token de la API (debería esconderse en .env en producción)
  const token = "b3a37cd5767744781e571fa4c127621c"

  // Estado del input de búsqueda y del superhéroe resultante
  const [search, setSearch] = useState('')
  const [hero, setHero] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Maneja el envío del formulario: valida, consulta la API y guarda el resultado
  const handleSubmit = async (e) => {
    e.preventDefault()
    const query = search.trim()
    if (!query) return // no hacemos nada si la búsqueda está vacía

    // reset y estado de carga
    setLoading(true)
    setError(null)
    setHero(null)

    try {
      // Llamada a la API de superhéroes
      const res = await fetch(
        `https://superheroapi.com/api.php/${token}/search/${query}`
      )
      const data = await res.json()

      // Si la API devuelve error o no hay resultados, lo gestionamos
      if (data.response === 'error' || !data.results || data.results.length === 0) {
        setError('No se ha encontrado ningún superhéroe con ese nombre.')
      } else {
        // Intentamos encontrar un nombre exactamente igual (ignora mayúsculas)
        const found = data.results.find(
          (superH) => superH.name.toLowerCase() === query.toLowerCase()
        ) || data.results[0] // si no hay coincidencia exacta, tomamos el primero

        setHero(found)
        console.log(found) // útil durante desarrollo
      }
    } catch (err) {
      // Error de red / fetch
      setError('Error al conectar con la API.')
    } finally {
      setLoading(false)
    }
  }

  // Genera una URL de avatar (Dicebear) a partir del nombre
  const getAvatarUrl = (name) => {
    if (!name) return ''
    return `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(name)}`
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Buscador de Superhéroes
      </h1>

      {/* Formulario de búsqueda (input controlado por `search`) */}
      <form
        action="#"
        onSubmit={handleSubmit}
        className="w-full max-w-md flex gap-2 mb-6"
      >
        <input
          type="text"
          name="search"
          id="Searcher"
          placeholder="Buscar superhéroe (ej: Batman)"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // actualiza el estado de búsqueda
          className="flex-1 rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-sm outline-none
                     placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold
                     transition-colors"
        >
          Buscar
        </button>
      </form>

      <div id="infoSuperHeroe" className="w-full max-w-md">
        {/* Estados: cargando, error o resultado */}
        {loading && (
          <p className="text-slate-300">Cargando...</p>
        )}

        {error && !loading && (
          <p className="text-red-400">{error}</p>
        )}

        {/* Tarjeta del héroe (muestra datos cuando hay `hero`) */}
        {hero && !loading && (
          <div className="rounded-2xl bg-slate-800/80 p-4 shadow-lg border border-white/10">
            <div className="flex gap-4">
              {/* Avatar generado con Dicebear usando `hero.name` como semilla */}
              <img
                src={getAvatarUrl(hero.name)}
                alt={hero.name}
                className="w-32 h-32 object-cover rounded-xl border border-slate-700 bg-slate-900"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{hero.name}</h2>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold">Nombre real:</span> {hero.biography?.['full-name'] || 'Desconocido'}
                </p>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold">Publisher:</span> {hero.biography?.publisher || 'Desconocido'}
                </p>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold">Primera aparición:</span> {hero.biography?.['first-appearance'] || 'N/A'}
                </p>
              </div>
            </div>

            {/* Powerstats: se muestran en una lista */}
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Powerstats</h3>
              <ul className="grid grid-cols-2 gap-1 text-sm text-slate-300">
                <li>Inteligencia: {hero.powerstats?.intelligence}</li>
                <li>Fuerza: {hero.powerstats?.strength}</li>
                <li>Velocidad: {hero.powerstats?.speed}</li>
                <li>Durabilidad: {hero.powerstats?.durability}</li>
                <li>Poder: {hero.powerstats?.power}</li>
                <li>Combate: {hero.powerstats?.combat}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App