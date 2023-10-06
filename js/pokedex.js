

// fetch('https://pokeapi.co/api/v2/pokemon/')
//     .then((response) => {
//         return response.json();
//     })
//     .then((myJson) => {
//         console.log(myJson);

//     //     for(let index = 0; index < myJson.results.length; index++) {
//     // const pokemons = myJson.results[index];

//     // let div$$ = document.createElement('div')
//     // let h2$$ = document.createElement('h2')
//     // h2$$.textContent = pokemons.name
//     // div$$.appendChild(h2$$)
    

//     // fetch(pokemons.url)
//     //     .then((response) => {
//     //         return response.json();
//     //     })
//     //     .then((fotos) => {
//     //         console.log(fotos);
//     //         let img$$ = document.createElement('img')
//     //         img$$.src = fotos.sprites.front_default;
//     //         div$$.appendChild(img$$)
//     //         document.body.appendChild(div$$)
//     //     });
//     }
// )



const pokedex = document.getElementById("pokedex");

const getPokemonById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((res) => res.json());
};

const pokemonComponent = ({ name, image, type, id, image2, habilidad, image3 }) => {
  return  `<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
    <h2 class="card-title">#${id} ${name}</h2>
    <h3 class="card-subtitle">${type}</h3>
    <img class="card-image" src="${image}"/>
    </div>
    <div class="flip-card-back">
    <img class="card-image" src="${image2}"/>
    <h2 class="card-subtitle">"${image3}"</h2>>
    <h2 class="card-subtitle">"${habilidad}"</h2>
    </div>
  </div>
</div>`
};


const getAllPokemon = async (limite) => {
  for (let i = 1; i <= limite; i++) {
    const res = await getPokemonById(i);
    pokedex.innerHTML += pokemonComponent({  
      id: i,
      name: res.name,
      image: res.sprites["front_default"],
      image2: res.sprites["back_default"],
      image3: res.moves[0].move.name,
      habilidad: res.abilities[0].ability.name,
      type: res.types.map((type) => type.type.name).join(", ")
    });
  }
};

getAllPokemon(150);

// const scrollSpy = new bootstrap.ScrollSpy(document.body, {
//     target: '#navbar-example'
//   })


// function addListeners() {
//   // TODO
//   console.log('addListeners');
// }

// window.onload = function () {
//   addListeners();
// };

// document.querySelectorAll('#nav-tab>[data-bs-toggle="tab"]').forEach(el => {
//   el.addEventListener('shown.bs.tab', () => {
//     const target = el.getAttribute('data-bs-target')
//     const scrollElem = document.querySelector(`${target} [data-bs-spy="scroll"]`)
//     bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh()
//   })
// })
