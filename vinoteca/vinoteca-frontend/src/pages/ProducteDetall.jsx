import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { vinosAPI, cervesesAPI, IMG_URL } from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProducteDetall() {
  const { tipo, id } = useParams(); // tipo: 'vino' | 'cervesa'
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const tipoModel = tipo === "vino" ? "Vino" : "Cerveza";
  const tipoLabel = tipo === "vino" ? "Vi" : "Cervesa";
  const emoji = tipo === "vino" ? "🍷" : "🍺";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = tipo === "vino" ? vinosAPI : cervesesAPI;
        const { data } = await api.getById(id);
        setProduct(data.vino || data.cervesa || data.producte || data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Producte no trobat");
        } else {
          setError("Error en carregar el producte");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tipo, id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 page-enter">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="skeleton rounded-xl h-96" />
          <div className="space-y-4 pt-4">
            <div className="skeleton h-8 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="skeleton h-12 w-32 rounded mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🍾</p>
          <h2 className="font-display text-3xl text-stone-300 mb-2">
            {error || "Producte no trobat"}
          </h2>
          <p className="text-stone-500 font-body text-sm mb-6">
            Verifica que l'adreça és correcta o torna al catàleg.
          </p>
          <Link to="/cataleg" className="btn-ghost">
            Tornar al catàleg
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc = product.imatge
    ? product.imatge.startsWith("http")
      ? product.imatge
      : `${IMG_URL}/${product.imatge.replace(/\\/g, "/")}`
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, tipoModel);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 page-enter">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-body mb-10">
          <Link to="/" className="hover:text-stone-300 transition-colors">
            Inici
          </Link>
          <span>/</span>
          <Link
            to="/cataleg"
            className="hover:text-stone-300 transition-colors"
          >
            Catàleg
          </Link>
          <span>/</span>
          <span className="text-stone-300">{product.nombre}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden bg-cellar-900 border border-stone-800/60 aspect-[3/4] flex items-center justify-center">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span className="text-8xl opacity-30">{emoji}</span>
                <span className="text-xs uppercase tracking-widest text-stone-600 font-body">
                  {tipoLabel}
                </span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span
                className={`badge text-[9px] uppercase tracking-widest border font-body
                ${tipo === "vino" ? "badge-burgundy" : "bg-amber-900/30 text-amber-400/80 border-amber-800/30"}`}
              >
                {tipoLabel}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="pt-2">
            <h1 className="font-display text-4xl md:text-5xl text-stone-100 font-light leading-tight mb-4">
              {product.nombre}
            </h1>
            <div className="gold-line" />

            {product.descripcion && (
              <p className="text-stone-400 font-body text-sm leading-relaxed mb-6">
                {product.descripcion}
              </p>
            )}

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {product.graduacion && (
                <Spec label="Graduació" value={`${product.graduacion}°`} />
              )}
              {product.detalles?.tipo && (
                <Spec label="Tipus" value={product.detalles.tipo} />
              )}
              {product.detalles?.origen && (
                <Spec label="Origen" value={product.detalles.origen} />
              )}
              {product.detalles?.anyada && (
                <Spec label="Anyada" value={product.detalles.anyada} />
              )}
              {product.detalles?.maridatge && (
                <Spec label="Maridatge" value={product.detalles.maridatge} />
              )}
              {product.stock != null && (
                <Spec
                  label="Stock"
                  value={
                    product.stock > 0 ? `${product.stock} unitats` : "Esgotat"
                  }
                  warn={product.stock === 0}
                />
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-5xl text-gold-400">
                {product.precio != null
                  ? `${Number(product.precio).toFixed(2)}`
                  : "—"}
              </span>
              {product.precio != null && (
                <span className="text-xl text-gold-400/60 font-display">€</span>
              )}
            </div>

            {/* Quantity + CTA */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-700 rounded overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-3 text-stone-400 hover:text-stone-100 hover:bg-cellar-800 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 text-sm font-body text-stone-200 min-w-[2rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="px-4 py-3 text-stone-400 hover:text-stone-100 hover:bg-cellar-800 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 justify-center py-3"
                >
                  Afegir al Carret
                </button>
              </div>
            )}

            {product.stock === 0 && (
              <div className="border border-stone-800 rounded p-4 text-center">
                <p className="text-stone-500 font-body text-sm">
                  Aquest producte està esgotat temporalment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value, warn }) {
  return (
    <div className="bg-cellar-900/60 border border-stone-800/40 rounded p-3">
      <p className="text-[10px] uppercase tracking-widest text-stone-500 font-body mb-1">
        {label}
      </p>
      <p
        className={`text-sm font-body font-medium ${warn ? "text-stone-500" : "text-stone-200"}`}
      >
        {value}
      </p>
    </div>
  );
}
