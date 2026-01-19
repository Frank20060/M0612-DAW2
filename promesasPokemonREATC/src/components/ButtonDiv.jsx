

export function ButtonsDiv({ button1Click, button2Click, button3Click, time1, time2, time3 }) {
  return (
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button onClick={button1Click} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            Exercici 1 (.then/.catch/.finally)
            Time = {time1} ms
          </button>
          
          <button onClick={button2Click} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            Exercici 2 (Async/await) 
            Time = {time2} ms
          </button>

          <button onClick={button3Click} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            Exercici 3 (Promise.All) 
            Time = {time3} ms
          </button>
        </div>)
    }