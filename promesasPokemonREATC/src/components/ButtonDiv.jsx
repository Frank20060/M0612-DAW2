

export function ButtonsDiv() {
  return (
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            Exercici 1 (.then/.catch/.finally)
          </button>
          
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            Exercici 2 (Async/await)
          </button>
          
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            Exercici 3 (Promise.All)
          </button>
        </div>)
    }