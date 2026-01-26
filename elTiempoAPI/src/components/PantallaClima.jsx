import { TarjetaCiudad } from "./TarjetaCiudad";

export function PantallaClima({ tiempo }) {
  const formatDate = (dateString) => {
    const [date, time] = dateString.split(" ");
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="space-y-6 mt-8 animate-in fade-in duration-500">
      {/* Header Principal */}
      <div className="bg-linear-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {tiempo.provincia.NOMBRE_PROVINCIA}
            </h2>
            <p className="text-white/70 text-sm">
              Capital:{" "}
              <span className="text-cyan-300 font-semibold">
                {tiempo.provincia.CAPITAL_PROVINCIA}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-sm mb-1">Actualizado</p>
            <p className="text-white font-semibold">
              {formatDate(tiempo.elaborado)}
            </p>
          </div>
        </div>

        {/* Descripción General */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-white/80 text-center md:text-left leading-relaxed">
            {tiempo.today.p}
          </p>
        </div>
      </div>

      {/* Grid de Ciudades */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4 px-1">Ciudades</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiempo.ciudades.map((c) => (
            <TarjetaCiudad key={c.id[0]} ciudad={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
