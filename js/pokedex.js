const pokedex = document.getElementById("pokedex");
pokemons = []  //creo esta variable vacia , para ano llamar siempre a la Api, y utilizar los pokemon y caracteristicas que ya he buscado
showingPokemons = []  
types = []  //me creo una nueva variable vacia para introducir los tipo de pokemon


//Aqui llamo a todos los pokemon en gral
const getPokemonById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((res) => res.json());
};

//aqui una vez leida la url, qu eme devuelva los datos que contiene y los convierta en json
const getPokemon = (url) => {
  return fetch(url).then((res) => res.json());
};

//le indico cuantos n° de pokemon mostrar y desde cual.
const getPokemonList = (nPokemon, startPokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${nPokemon}&offset=${startPokemonId}`;
  return fetch(url).then((res) => res.json());
}

//aqui creo las cartas con los pokemon y sus caracteristicas
const pokemonComponent = ({ name, image, types, id, image2, habilidad, image3 }) => {
  return `<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front ${types[0]}">
    <img class="card-image" src="${image}"/>
    <h2 class="card-title">${name}</h2>
    <h3 class="card-subtitle">${types.join(", ")}</h3>
    </div>
    <div class="flip-card-back">
    <img class="card-image imagen:hover" src="${image2}"/>
    <h2 class="card-subtitle2">"His movement is ${image3}"</h2>>
    <h2 class="card-subtitle2">"His ability is ${habilidad}"</h2>
    </div>
  </div>
</div>`
};

//una vez creado el fetch q me lea las url, le pido cada caracteristica y q me las guarde todas
//en una misma variable, para poder reutilzarla y no llamar constantemente a la api
const getAllPokemon = async (limite, offset) => {
  const res = await getPokemonList(limite, offset)
  let pokList = res.results
  for (let pok of pokList) {
    const res = await getPokemon(pok.url);
    // console.log(res)
    let pokemon = {
      id: res.id,
      name: res.name,
      image: res.sprites["front_default"],
      image2: res.sprites.versions["generation-v"]["black-white"].animated.back_default,
      image3: res.moves[0].move.name,
      habilidad: res.abilities[0].ability.name,
      types: res.types.map((type) => type.type.name)
    }
    pokemons.push(pokemon)
    showingPokemons.push(pokemon)
    pokedex.innerHTML += pokemonComponent(pokemon);
  }
};

const filterByType = async (type) => {
  /*if (type == "all")
    showingPokemons = pokemons
  else
    showingPokemons = pokemons.filter(pok => pok.types.includes(type))
  */ // Equivalente a la linea de abajo
  showingPokemons = type == "all" ? pokemons : pokemons.filter(pok => pok.types.includes(type))
  pokedex.innerHTML = "";
  for (let pok of showingPokemons) {
    pokedex.innerHTML += pokemonComponent(pok);
  }
}

// Selecciona el botón de inicio
const botonInicio = document.getElementById('botonInicio');

// Selecciona la pantalla principal
const pantallaPrincipal = document.getElementById('pantallaPrincipal');

// Agrega un evento click al botón de inicio
botonInicio.addEventListener('click', function () {
  // Oculta la pantalla de presentación

  //Aqui va la pantalla de bienvenida

  // Incluir mensaje de "Cargando Pokedex"
  getAllPokemon(151, 0)
    .then(() => {
      types = pokemons.map(pok => pok.types).flat() // Map extrae de todos los pkmn, su tipo, y flat los "aplana" en una matriz para evitar anidamiento
      types = Array.from(new Set(types)) // Para elminar duplicados, convertimos la matriz en un set, que por definición nunca permite duplicados
      types.push("all") // Agreamos un nuevo tipo llamado "Todos"
      loadTypeFilters();
      // Una vez obtenido el set, volvemos a transformar el set en una array, y ya tenemos una array sin duplicados
      document.querySelector('.presentacion').style.display = 'none';
      // Muestra la pantalla principal
      pantallaPrincipal.style.display = 'block';
    })
});

loadTypeFilters = function () {
  // Agregamos los typeFilters antes del div de la pokedex
  const typeFilter = document.getElementById("typeFilter");
  for (let type of types) {
    //creo los botones para busqueda por tipo, y le digo que seun cada tipo, elija su icon
    let typeFilter$$ = document.createElement('button')
    typeFilter$$.classList = 'button2'
    typeFilter$$.style.backgroundImage = `url(assets/typeIcons/${type}_icon.png)`
    typeFilter$$.addEventListener('click', function () {
      filterByType(type)
    })
    typeFilter.appendChild(typeFilter$$);
  }

}

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  filterPokemon(searchTerm);
})

const filterPokemon = (searchTerm) => {
  // tenemos que poner el nombre del pokemon en 
  // minúsculas: pikachu != PikAChU
  showingPokemons = pokemons.filter(pok =>
    pok.name.toLowerCase().includes(searchTerm) /*||
    pok.abilities.toLowerCase().includes(searchTerm.toLowerCase())*/
  )
  pokedex.innerHTML = "";
  for (let pok of showingPokemons) {
    pokedex.innerHTML += pokemonComponent(pok);
  }
};