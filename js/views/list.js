const pokedex = document.getElementById("pokedex");

const getPokemonById = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((res) => res.json());
};

const pokemonComponent = ({ name, image, type, id }) => {
  return `<div class="card">
  <div class="card-title">#${id} ${name}<div/>
  <div class="card-subtitle">${type}<div/>
  <img class="card-image" src="${image}"/>
  <div/>`;
};

const getAllPokemon = async (limite) => {
  for (let i = 1; i <= limite; i++) {
    const res = await getPokemonById(i);
    pokedex.innerHTML += pokemonComponent({  
      id: i,
      name: res.name,
      image: res.sprites["front_default"],
      type: res.types.map((type) => type.type.name).join(", ")
    });
  }
};

getAllPokemon(150);

const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-example'
  })
  
