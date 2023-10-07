
const pokedex = document.getElementById("pokedex");

const getPokemonById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((res) => res.json());
};

let h1$$ = document.querySelector('h1')
let divContainer$$ = document.querySelector("div")
let button$$ = document.createElement('button')
button$$.classList = 'button'
button$$.textContent = 'Press to Play!'

button$$.addEventListener('click', function() {
  window.location.href = 'https://pokemon-game.tecnops.es/?_gl=1*12cvo6r*_ga*ODQ5NTk0MDkyLjE2OTY2NjUxNzc.*_ga_Q84VJ2W6Q0*MTY5NjY2NTE3Ni4xLjAuMTY5NjY2NTE3Ni42MC4wLjA.&_ga=2.247900359.1702337096.1696665177-849594092.1696665177'})
h1$$.appendChild(button$$)

const pokemonComponent = ({ name, image, type, id, image2, habilidad, image3 }) => {
  return  `<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front ${type}">
    <img class="card-image" src="${image}"/>
    <h2 class="card-title">${name}</h2>
    <h3 class="card-subtitle">${type}</h3>
    </div>
    <div class="flip-card-back">
    <img class="card-image imagen:hover" src="${image2}"/>
    <h2 class="card-subtitle2">"His movement is ${image3}"</h2>>
    <h2 class="card-subtitle2">"His ability is ${habilidad}"</h2>
    </div>
  </div>
</div>`
};

// let h1$$ = document.querySelector('h1')
// let img$$ = document.createElement('img')
// h1$$.appendChild(img$$)
// img$$.setAttribute("style", "width:550px, margin-left:180px");
// img$$.src = 'https://static.vecteezy.com/system/resources/thumbnails/027/127/591/small_2x/pokemon-logo-pokemon-icon-transparent-free-png.png'

const getAllPokemon = async (limite) => {
  for (let i = 1; i <= limite; i++) {
    const res = await getPokemonById(i);
    pokedex.innerHTML += pokemonComponent({  
      id: i,
      name: res.name,
      image: res.sprites["front_default"],
      image2: res.sprites.versions["generation-v"]["black-white"].animated.back_default,
      image3: res.moves[0].move.name,
      habilidad: res.abilities[0].ability.name,
      type: res.types[0].type.name,
      // .map((type) => type.type.name)
    });
  }
};

getAllPokemon(150);



// Selecciona el botón de inicio
const botonInicio = document.getElementById('botonInicio');

// Selecciona la pantalla principal
const pantallaPrincipal = document.getElementById('pantallaPrincipal');

// Agrega un evento click al botón de inicio
botonInicio.addEventListener('click', function() {
    // Oculta la pantalla de presentación
    document.querySelector('.presentacion').style.display = 'none';
    

    // Muestra la pantalla principal
    pantallaPrincipal.style.display = 'block';
});