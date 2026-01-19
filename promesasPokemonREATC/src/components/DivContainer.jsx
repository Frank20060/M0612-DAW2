

export function divCards(){
    return(
        <div
          id="cardsContainer"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Aquí van las cartas de los pokemons */}

            <div id="card1">

                <img src="" alt="Foto pokemon" />
                <h1 id="Name1"></h1>
                <p id="ID1"></p>
                <p id="type1"></p>
                <p id="weight1"></p>
                <p id="height1"></p>
            </div>  


        </div>


    )
}
