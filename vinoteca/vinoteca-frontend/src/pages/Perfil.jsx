import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { pedidosAPI, authAPI, IMG_URL, getFullImageUrl } from "../api/axios";
import toast from "react-hot-toast";

const toastStyle = {
  background: "#1e1118",
  color: "#e7e5e4",
  border: "1px solid #3d2133",
  fontFamily: '"DM Sans", sans-serif',
  fontSize: "14px",
};

export default function Perfil() {
  const { user, setUser, isAdmin, isEditor } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
  });
  const [activeTab, setActiveTab] = useState("perfil");

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        const { data } = await pedidosAPI.getMine();
        setPedidos(
          Array.isArray(data) ? data : data.pedidos || data.orders || [],
        );
      } catch {
        // silent
      } finally {
        setLoadingPedidos(false);
      }
    };
    loadPedidos();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await authAPI.updatePerfil(form);
      const updated = data.usuario || data.user || data;
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setEditMode(false);
      toast.success("Perfil actualitzat", { style: toastStyle });
    } catch (err) {
      const msg =
        err.response?.data?.mensaje || "Error en actualitzar el perfil";
      toast.error(msg, { style: toastStyle });
    } finally {
      setSaving(false);
    }
  };

  const imgSrc = getFullImageUrl(user?.imatge);

  const rolLabel =
    { admin: "Administrador", editor: "Editor", usuari: "Usuari" }[user?.rol] ||
    user?.rol ||
    "Usuari";
  const rolColor =
    { admin: "badge-gold", editor: "badge-burgundy" }[user?.rol] ||
    "badge bg-stone-800/40 text-stone-400 border border-stone-700/40";

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 page-enter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 pb-8 border-b border-stone-800/60">
          {/* Avatar */}
          <div className="relative">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={user?.nombre}
                className="w-20 h-20 rounded-full object-cover border-2 border-gold-500/30"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-burgundy-900/60 border-2 border-burgundy-800/40 flex items-center justify-center">
                <span className="font-display text-3xl text-gold-400">
                  {user?.nombre?.[0]?.toUpperCase() || "?"}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="font-display text-3xl text-stone-100">
                {user?.nombre || "Usuari"}
              </h1>
              <span className={rolColor}>{rolLabel}</span>
            </div>
            <p className="text-stone-400 font-body text-sm">{user?.email}</p>
          </div>

          {(isAdmin || isEditor) && (
            <a
              href="/dashboard"
              className="btn-ghost text-xs whitespace-nowrap"
            >
              Anar al Dashboard →
            </a>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-800/60 mb-8 gap-6">
          {["perfil", "comandes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs uppercase tracking-widest font-body font-medium border-b-2 transition-all ${
                activeTab === tab
                  ? "text-gold-400 border-gold-500"
                  : "text-stone-500 border-transparent hover:text-stone-300"
              }`}
            >
              {tab === "perfil"
                ? "Dades Personals"
                : `Les Meves Comandes (${pedidos.length})`}
            </button>
          ))}
        </div>

        {/* Tab: Perfil */}
        {activeTab === "perfil" && (
          <div className="glass-panel p-8 max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-stone-100">
                Informació del Compte
              </h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="btn-ghost text-xs py-1.5 px-4"
                >
                  Editar
                </button>
              )}
            </div>

            {editMode ? (
              <div className="space-y-4">
                <div>
                  <label className="label">Nom</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, nombre: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary text-xs py-2 disabled:opacity-60"
                  >
                    {saving ? "Desant…" : "Desar Canvis"}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setForm({
                        nombre: user?.nombre || "",
                        email: user?.email || "",
                      });
                    }}
                    className="btn-ghost text-xs py-2"
                  >
                    Cancel·lar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <InfoRow label="Nom" value={user?.nombre} />
                <InfoRow label="Email" value={user?.email} />
                <InfoRow label="Rol" value={rolLabel} />
                <InfoRow
                  label="Foto de Perfil"
                  value={user?.imatge ? "Carregada ✓" : "No configurada"}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab: Comandes */}
        {activeTab === "comandes" && (
          <div>
            {loadingPedidos ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-24 rounded-lg" />
                ))}
              </div>
            ) : pedidos.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-5xl block mb-4">📦</span>
                <p className="font-display text-2xl text-stone-400 mb-2">
                  Encara no has fet cap comanda
                </p>
                <p className="text-stone-500 font-body text-sm mb-6">
                  Explora el catàleg i descobreix els nostres productes
                </p>
                <a href="/cataleg" className="btn-ghost text-xs">
                  Anar al Catàleg
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {pedidos.map((pedido) => (
                  <PedidoCard key={pedido._id} pedido={pedido} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-stone-800/40 last:border-0">
      <span className="text-xs uppercase tracking-widest text-stone-500 font-body">
        {label}
      </span>
      <span className="text-sm font-body text-stone-200 text-right max-w-[60%]">
        {value || "—"}
      </span>
    </div>
  );
}

function PedidoCard({ pedido }) {
  const [open, setOpen] = useState(false);
  const date = new Date(pedido.createdAt || pedido.fecha).toLocaleDateString(
    "ca-ES",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  const statusLabel =
    {
      pendent: "Pendent",
      processat: "Processat",
      enviat: "Enviat",
      entregat: "Entregat",
      cancel·lat: "Cancel·lat",
    }[pedido.estat || pedido.estado] ||
    pedido.estat ||
    pedido.estado ||
    "Pendent";

  const statusColor =
    {
      Pendent: "text-amber-400/80 border-amber-900/40",
      Processat: "text-blue-400/80 border-blue-900/40",
      Enviat: "text-purple-400/80 border-purple-900/40",
      Entregat: "text-emerald-400/80 border-emerald-900/40",
    }[statusLabel] || "text-stone-400 border-stone-700";

  return (
    <div className="card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-4">
          <div>
            <p className="font-body text-sm text-stone-200 font-medium">
              Comanda #{pedido._id?.slice(-6).toUpperCase() || "—"}
            </p>
            <p className="text-xs text-stone-500 font-body mt-0.5">{date}</p>
          </div>
          <span
            className={`badge text-[9px] uppercase tracking-widest border font-body bg-cellar-800/60 ${statusColor}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-display text-xl text-gold-400">
            {Number(pedido.total || 0).toFixed(2)} €
          </span>
          <svg
            className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
      </button>

      {open && pedido.productos && (
        <div className="border-t border-stone-800/60 px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-stone-500 font-body mb-3">
            Articles
          </p>
          <div className="space-y-2">
            {pedido.productos.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm font-body"
              >
                <span className="text-stone-300">
                  {item.producto_id?.nombre ||
                    item.nombre ||
                    item.producto_id ||
                    "Producte"}
                  <span className="text-stone-600 ml-1">
                    ({item.producto_modelo || item.tipo})
                  </span>
                </span>
                <span className="text-stone-400">
                  × {item.cantidad || item.quantitat || 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
