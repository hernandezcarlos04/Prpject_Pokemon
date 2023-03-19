const {Router} = require("express");
const { getDBTypes, getTypes} = require('../controllers/typeControllers')
const typeRouter = Router();

typeRouter.get('/', getTypes) //Cargar los tipos
typeRouter.get('/find', getDBTypes) //traerlos

module.exports = typeRouter;