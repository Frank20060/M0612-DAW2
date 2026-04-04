import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { vinosAPI, cervesesAPI, IMG_URL } from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [vR, cR] = await Promise.allSettled([
          vinosAPI.getAll(),
          cervesesAPI.getAll(),
        ]);

        // Helper para normalizar (igual que en Cataleg)
        const normalize = (res) => {
          const d = res.value.data;
          const list = Array.isArray(d)
            ? d
            : d.dades || d.vinos || d.cervesas || d.data || [];
          return list.map((p) => ({
            ...p,
            ...p.detalles,
            imatge: p.imatge
              ? p.imatge.startsWith("http")
                ? p.imatge
                : `${IMG_URL}/${p.imatge.replace(/\\/g, "/")}`
              : null,
          }));
        };

        const vinos =
          vR.status === "fulfilled" ? normalize(vR).slice(0, 2) : [];
        const cerveses =
          cR.status === "fulfilled" ? normalize(cR).slice(0, 2) : [];
        const vTagged = vinos.map((p) => ({ product: p, tipo: "Vino" }));
        const cTagged = cerveses.map((p) => ({ product: p, tipo: "Cerveza" }));
        setFeatured([...vTagged, ...cTagged].slice(0, 4));
      } catch {
        // silent fail
      }
    };
    load();
  }, []);

  return (
    <div className="relative">
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-burgundy-900/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cellar-700/30 blur-[80px]" />
          {/* Decorative lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gold-gradient" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold-500 font-body">
              Bodegas Artesanales desde 1987
            </span>
            <div className="h-px w-16 bg-gold-gradient" />
          </div>

          {/* Title */}
          <h1 className="font-display text-7xl md:text-9xl text-stone-100 font-light leading-none mb-4">
            Vinacoteca
          </h1>
          <p className="font-display text-xl md:text-2xl text-stone-400 font-light italic mb-10">
            El arte del vino y la cerveza artesanal
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/cataleg" className="btn-primary text-sm px-8 py-3">
              Descubrir el Catálogo
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link to="/registre" className="btn-ghost text-sm px-8 py-3">
              Crear Cuenta
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] uppercase tracking-widest text-stone-600 font-body">
            Desplaza
          </span>
          <svg
            className="w-4 h-4 text-stone-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── ABOUT STRIP ────────────────────────────────────────── */}
      <section className="py-20 border-y border-stone-800/40">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            {
              icon: "🍷",
              title: "Vinos Seleccionados",
              desc: "Cuidadosa selección de vinos de las mejores denominaciones de origen.",
            },
            {
              icon: "🍺",
              title: "Cervezas Artesanales",
              desc: "Cervezas artesanales de productores locales e internacionales.",
            },
            {
              icon: "🚚",
              title: "Entrega Exprés",
              desc: "Entrega en 24–48 horas, con embalaje seguro y profesional.",
            },
          ].map((f) => (
            <div key={f.title} className="text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {f.icon}
              </div>
              <h3 className="font-display text-xl text-stone-100 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-stone-500 font-body leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold-500/70 font-body mb-3">
              Selección destacada
            </p>
            <h2 className="section-title">Nuestros Favoritos</h2>
            <div className="gold-line mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(({ product, tipo }) => (
              <ProductCard
                key={`${tipo}-${product._id}`}
                product={product}
                tipo={tipo}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/cataleg" className="btn-ghost">
              Ver todo el catálogo
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* ── BANNER CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-burgundy-gradient opacity-5 rounded-xl" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl text-stone-100 font-light mb-4">
              Empieza tu colección
            </h2>
            <p className="text-stone-400 font-body text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              Regístrate y accede a pedidos exclusivos, historial de compras
              y recomendaciones personalizadas.
            </p>
            <Link to="/registre" className="btn-primary px-8 py-3">
              Registrarse ahora · Es gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-stone-800/40 py-10 px-6 text-center">
        <p className="font-display text-xl text-stone-600 mb-2">Vinacoteca</p>
        <p className="text-xs text-stone-700 font-body uppercase tracking-widest">
          © {new Date().getFullYear()} · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
