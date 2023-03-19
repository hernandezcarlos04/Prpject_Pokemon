const {Pokemon,Type} = require('../db');
const {v4: uuidv4} = require ('uuid');
const axios = require ('axios');
//to API
let fullInfoGetter = function (response) {
    const {id,sprites,name,stats,height,weight,types, created = false} = response.data;
    let arrTypes = [];
    for (let i = 0; i < types.length; i++) {
        arrTypes.push(types[i].type.name);
    }
    let pokemon = {
        id: id,
        img : sprites.other["official-artwork"].front_default,
        name,
        hp : stats[0].base_stat,
        str : stats[1].base_stat,
        def : stats[2].base_stat,
        agi : stats[5].base_stat,
        height,
        weight,
        type: arrTypes,
        created: false
    }
    return pokemon;
}
//to API
let partInfoGetter = function (response) {
    const {sprites,name,types,stats} = response.data;
    let arrTypes = [];
    for (let i = 0; i < types.length; i++) {
        arrTypes.push(types[i].type.name);
    }
    let pokemon = {
        img : sprites.other["official-artwork"].front_default,
        name,
        str : stats[1].base_stat,
        type: arrTypes
    }
    return pokemon;
}
let InfoGetterDB = function (rawPokemon){
    const {id,name,img,hp,str,def,agi,height,weight, created} = rawPokemon;
    let correction = rawPokemon.types.map(relation=> relation.type)
    let pokemon = {
        id,
        name,
        img,
        hp,
        str,
        def,
        agi,
        height,
        weight,
        type: correction,
        created
    }
    return pokemon;
                
}
let promiseGenerator = function (req,urlPoke){
    console.log("holaaaaaaaaaaaaa", req.body)
    const {name, imagen, hp, str, def, agi, height, weight, type, created} = req.body;
        let findIds = Type.findAll({
            attributes: ["id"],
            where:{
                type : type
            }
        })
        let pCreated = Pokemon.create({
            id : uuidv4(),
            imagen,
            name,
            hp,
            str,
            def,
            agi,
            height,
            weight,
            type,
            created: true,
        })
        //pCreated.add(Type)
        let nameValidator = axios.get(`${urlPoke}/${name}`)
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })

        return [findIds,pCreated,nameValidator];
    }

module.exports = {
    fullInfoGetter,
    partInfoGetter,
    InfoGetterDB,
    promiseGenerator,
}