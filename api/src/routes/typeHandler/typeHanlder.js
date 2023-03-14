const getTypeHandler = (res, req) =>{
    res.status(201).json("Estoy en get type")
}

module.exports = {
    getTypeHandler
}