// //Search Pokemon
// const pokedexList = document.getElementById("pokedex");
// const searchInput = document.getElementById("searchInput");
// const searchButton = document.getElementById("searchButton");
// const allPokemonData = [];

// //Clean list
// const filterPokemon = (searchTerm) => {
//     pokedexList.innerHTML = ""; 

// //Filter
//     for (const res of allPokemonData) {
//         if (
//             res.name.toLowerCase().includes(searchTerm) ||
//             res.type.toLowerCase().includes(searchTerm) ||
//             res.abilities.toLowerCase().includes(searchTerm)
//         ) {
//             displayPokemon(pokemon);
//         }
//     }
// };

// searchButton.addEventListener("click", () => {
//     const searchTerm = searchInput.value.toLowerCase();
//     filterPokemon(searchTerm);
// });