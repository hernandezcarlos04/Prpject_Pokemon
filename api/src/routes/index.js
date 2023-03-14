const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const PokemonRouter = require('./PokemonRouter')
const TypeRouter = require('./TypeRouter')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/pokemon', PokemonRouter )
 router.use('/genres', TypeRouter)


module.exports = router;