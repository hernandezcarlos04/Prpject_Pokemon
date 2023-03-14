const {Router} = require("express");
const {getTypeHandler} = require('./typeHandler/typeHanlder')

const typeRouter = Router();

typeRouter.get('/', getTypeHandler)

module.exports = typeRouter;