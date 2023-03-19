const { Router } = require('express');
//const { getPokemonHandler, getPokemonHandlerById, postPokemonHandler } = require('./pokemonHandler/pokemonHandler')
const { getAllPokemon, getPokemonByIdoName, postPokemon } = require('../controllers/pokemonControllers')

const PokemonRouter = Router();

PokemonRouter.get('/', getAllPokemon)
PokemonRouter.get('/:idPokemon', getPokemonByIdoName )
PokemonRouter.post('/', postPokemon)

module.exports = PokemonRouter; 