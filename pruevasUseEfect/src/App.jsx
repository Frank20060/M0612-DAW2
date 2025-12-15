import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [avatar, setAvatar] = useState("http://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Jorge")


  const [datos, setDatos] = useState([])

  
  
  useEffect(()=>{ ///Efect que cuando se carga pa pagina se guardan los datos
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(datosJson=>{
          setDatos(datosJson)
        })
  },[])

  function cambiarNombre(e){
    setName(e.target.value)
  }
  function cambiarApellido(e){
    setSurname(e.target.value)
  }
  
  function handleSubmit(e){
    e.preventDefault()
  }

  
  useEffect(()=>{
    const seed = encodeURIComponent((name + surname).trim() || 'random')
    setAvatar(`https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=${seed}`)
  }, [name, surname])





  return (
    <div className="min-h-screen bg-linear-to-br from-slate-800 via-slate-900 to-slate-700 flex flex-col items-center justify-start py-16 px-4">
      <h1 className="mt-2 text-cyan-400 text-6xl font-extrabold drop-shadow-lg">Caras segun tu nombre y apellidos</h1>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-2xl flex flex-col gap-4 justify-center items-center ">
        <div className='flex flex-row gap-4'>
          <input
            type="text"
            onChange={cambiarNombre}
            placeholder="Nombre"
            className="flex-1 bg-white/6 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />
          <input
            type="text"
            onChange={cambiarApellido}
            placeholder="Apellido"
            className="flex-1 bg-white/6 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
          />
        </div>


      </form>

      {/*Card con imagen segun la foto*/}
      <div className="mt-8 mb-10">
        <img src={avatar} alt="Foto avatar" className="w-28 h-28 rounded-full mx-auto" />
          
        <p id="nombre" className="mt-4 text-center text-white/90 text-lg font-medium">
          {name + " " +surname}
        </p>
      </div>  

      <div className="h-fit bg-linear-to-br from-slate-900 to-slate-950 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-fit">
          {          
          datos.map((usuario, index) => (
            <div
              key={index}
              className="
                bg-slate-900/80 backdrop-blur
                rounded-2xl p-6 text-center
                shadow-lg shadow-black/40
                transition-all duration-300
                hover:-translate-y-2 hover:scale-[1.02]
                hover:shadow-cyan-400/30
                border border-slate-800
              "
            >
              {/* Avatar */}
             
              <img
                src={`https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=${usuario.name}`}
                alt={`Avatar de ${usuario.username}`}
                className="w-28 h-28 rounded-full mx-auto mb-5"
              />
              

              {/* Username */}
              <h1 className="text-xl font-semibold text-cyan-400">
                {usuario.username}
              </h1>

              {/* Nombre real */}
              <h2 className="text-sm text-slate-400 mb-3">
                {usuario.name}
              </h2>

              {/* Email */}
              <p className="text-sm text-slate-300 break-all">
                {usuario.email}
              </p>
            </div>
          ))
          }
        </div>
      </div>

      

    </div>
  )
}

export default App
