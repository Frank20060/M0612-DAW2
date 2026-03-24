import { useEffect, useState } from "react";
import { vinosAPI, cervezasAPI, IMG_URL } from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'vino', 'cerveza'

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🍷 [Catalog] Iniciando carga de productos...");
        setLoading(true);
        // 1. Peticiones en paralelo a los endpoints del backend
        const [vinosRes, cervezasRes] = await Promise.all([
          vinosAPI.getAll(),
          cervezasAPI.getAll(),
        ]);

        console.log("📦 [Catalog] Data Vinos:", vinosRes.data);
        console.log("📦 [Catalog] Data Cervezas:", cervezasRes.data);

        // 2. Normalización de datos
        // Detectamos la propiedad correcta: 'vinos'/'cervezas', 'dades' o array directo
        const rawVinos =
          vinosRes.data.vinos ||
          vinosRes.data.dades ||
          (Array.isArray(vinosRes.data) ? vinosRes.data : []);
        const rawCervezas =
          cervezasRes.data.cervezas ||
          cervezasRes.data.cerveses ||
          cervezasRes.data.dades ||
          (Array.isArray(cervezasRes.data) ? cervezasRes.data : []);

        const listaVinos = rawVinos.map((v) => ({
          ...v,
          ...v.detalles, // Extraemos 'bodega', 'uva', etc. al nivel superior
          tipo: "vino",
        }));
        const listaCervezas = rawCervezas.map((c) => ({
          ...c,
          ...c.detalles, // Extraemos 'estilo', 'formato', etc. al nivel superior
          tipo: "cerveza",
        }));

        // 3. Unificación
        setProducts([...listaVinos, ...listaCervezas]);
        console.log(
          `✅ [Catalog] Carga completa: ${listaVinos.length} vinos, ${listaCervezas.length} cervezas.`,
        );
      } catch (error) {
        console.error("❌ [Catalog] Error cargando catálogo:", error);
        toast.error("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrado simple en cliente
  const filteredProducts = products.filter((p) =>
    filter === "all" ? true : p.tipo === filter,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-600">
        Cargando bodega...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-4 md:mb-0">
          Nuestra Bodega
        </h1>

        {/* Controles de Filtro */}
        <div className="flex gap-2">
          {["all", "vino", "cerveza"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-red-900 text-white"
                  : "bg-stone-200 text-stone-600 hover:bg-stone-300"
              }`}
            >
              {f === "all" ? "Todos" : f === "vino" ? "Vinos" : "Cervezas"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={`${product.tipo}-${product._id}`}
            to={`/producte/${product.tipo}/${product._id}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-stone-100"
          >
            <div className="aspect-square bg-stone-50 relative overflow-hidden">
              {/* Renderizado de Imagen usando la URL estática del backend */}
              {product.imatge ? (
                <img
                  src={`${IMG_URL}/${product.imatge}`}
                  alt={product.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="p-4">
              <span className="text-xs font-semibold text-red-800 uppercase tracking-wider">
                {product.tipo}
              </span>
              <h3 className="font-serif text-lg text-stone-900 mt-1 mb-2 line-clamp-1">
                {product.nombre}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 text-sm">
                  {product.tipo === "vino" ? product.uva : product.estilo}
                </span>
                <span className="font-bold text-stone-800">
                  {product.precio}€
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
