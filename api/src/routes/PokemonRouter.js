const { Router } = require('express');
const { getPokemonHandler, getPokemonHandlerById, postPokemonHandler } = require('./pokemonHandler/pokemonHandler')

const PokemonRouter = Router();

PokemonRouter.get('/', getPokemonHandler)
PokemonRouter.get('/:idPokemon', getPokemonHandlerById )
PokemonRouter.post('/', postPokemonHandler)

module.exports = PokemonRouter; 