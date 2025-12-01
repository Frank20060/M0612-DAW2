
export function Avatar({ foto } = props) {
  return (
    <div className="relative flex justify-center">
      <div className="rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-[2px] transition-transform duration-200 group-hover:scale-110">
        <img
          src={foto}
          alt="alumno"
          className="h-16 w-16 rounded-full object-cover shadow-md"
        />
      </div>
    </div>
  )
}


