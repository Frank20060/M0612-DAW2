

export function SelectorGrupos({datosGrupo, controlGrupo}){
    
    
    return (
    <div className="relative inline-block w-full max-w-xs">
      <select onChange={controlGrupo}
        name="grupo"
        id="grupo"
        className="w-full cursor-pointer rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 shadow-inner outline-none transition-all duration-200 hover:border-indigo-400 hover:bg-slate-900/90 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        <option value="Todos" className="bg-slate-900">
          Selecciona el grupo
        </option>
        {datosGrupo.map((p, indexP) => (
          <option value={indexP} key={indexP} className="bg-slate-900">
            Promoción: {p}
          </option>
        ))}
      </select>
    </div>
  )
}