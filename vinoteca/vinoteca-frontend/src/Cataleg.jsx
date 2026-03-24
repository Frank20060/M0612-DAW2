import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { vinosAPI, cervezasAPI, IMG_URL } from "../api/axios";

export default function Cataleg() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'vino', 'cerveza'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🍷 [Cataleg] Iniciando carga de productos...");

        // 1. Peticiones en paralelo
        const [vinosRes, cervezasRes] = await Promise.all([
          vinosAPI.getAll(),
          cervezasAPI.getAll(),
        ]);

        // 2. Helper para extraer el array de datos de la respuesta del backend
        // El backend puede devolver { dades: [...] } o { vinos: [...] } o directamente [...]
        const getDataArray = (resData) => {
          if (Array.isArray(resData)) return resData;
          return resData.dades || resData.vinos || resData.cervezas || resData.cerveses || [];
        };

        const rawVinos = getDataArray(vinosRes.data);
        const rawCervezas = getDataArray(cervezasRes.data);

        console.log(`📦 [Cataleg] Recibidos: ${rawVinos.length} vinos y ${rawCervezas.length} cervezas`);

        // 3. Normalización y unificación
        const listaVinos = rawVinos.map((v) => ({
          ...v,
          ...(v.detalles || {}), // Sacamos 'bodega', 'uva', etc. al nivel principal
          tipo: "vino",
        }));
        
        const listaCervezas = rawCervezas.map((c) => ({
          ...c,
          ...(c.detalles || {}), // Sacamos 'estilo', 'formato', etc. al nivel principal
          tipo: "cerveza",
        }));

        setProducts([...listaVinos, ...listaCervezas]);
      } catch (error) {
        console.error("❌ [Cataleg] Error cargando catálogo:", error);
        toast.error("Error al cargar la bodega");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((p) =>
    filter === "all" ? true : p.tipo === filter
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-stone-600">Cargando bodega...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-4 md:mb-0">Nuestra Bodega</h1>
        <div className="flex gap-2">
          {["all", "vino", "cerveza"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f ? "bg-red-900 text-white" : "bg-stone-200 text-stone-600 hover:bg-stone-300"
              }`}
            >
              {f === "all" ? "Todos" : f === "vino" ? "Vinos" : "Cervezas"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={`${product.tipo}-${product._id}`} to={`/producte/${product.tipo}/${product._id}`} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-stone-100">
            <div className="aspect-square bg-stone-50 relative overflow-hidden">
              <img 
                src={product.imatge ? `${IMG_URL}/${product.imatge}` : "https://via.placeholder.com/400?text=No+Image"} 
                alt={product.nombre} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Error+Img"; }}
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-red-800 uppercase tracking-wider">{product.tipo}</span>
              <h3 className="font-serif text-lg text-stone-900 mt-1 mb-2 line-clamp-1">{product.nombre}</h3>
              <div className="flex justify-between items-center"><span className="text-stone-500 text-sm">{product.tipo === "vino" ? product.uva : product.estilo}</span><span className="font-bold text-stone-800">{product.precio}€</span></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
