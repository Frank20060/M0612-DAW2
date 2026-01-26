export function TarjetaCiudad({ ciudad }) {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("lluvia")) return "🌧️";
    if (desc.includes("nieve")) return "❄️";
    if (desc.includes("sol") || desc.includes("despejado")) return "☀️";
    if (desc.includes("nube") || desc.includes("nublado")) return "☁️";
    if (desc.includes("tormenta")) return "⛈️";
    if (desc.includes("viento")) return "💨";
    return "🌤️";
  };

  return (
    <div className="group bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-cyan-400/50 transition duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold text-xl mb-1">{ciudad.name}</h3>
          <p className="text-white/60 text-sm">{ciudad.stateSky.description}</p>
        </div>
        <span className="text-4xl">
          {getWeatherIcon(ciudad.stateSky.description)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/50 text-xs font-semibold mb-1">MÁX</p>
          <p className="text-white font-bold text-2xl">
            {ciudad.temperatures.max}°
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/50 text-xs font-semibold mb-1">MÍN</p>
          <p className="text-white font-bold text-2xl">
            {ciudad.temperatures.min}°
          </p>
        </div>
      </div>
    </div>
  );
}
