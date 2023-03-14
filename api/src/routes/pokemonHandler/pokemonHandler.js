
const getPokemonHandler = (req, res) => {
    res.send("estyo dentro de get pokemon ")
}

const getPokemonHandlerById = (req, res) => {
    res.send("Estoy en get Pokemons by id ")
}

const postPokemonHandler = (req, res) => {
    res.send("Estoy en post ")
}

module.exports = {
    getPokemonHandler,
    getPokemonHandlerById,
    postPokemonHandler
}