require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const {
  partInfoGetter,
  fullInfoGetter,
  promiseGenerator,
  InfoGetterDB,
} = require("./functions");
const { API_URL } = process.env;

function getAllPokemon(req, res, next) {
  let limitAxios = 3;

  axios
    .get(`${API_URL}?limit=${limitAxios}`)
    .then((response) => response.data.results)
    .then((pokeApi) => {
      let array1 = pokeApi.map((pok) => axios.get(pok.url));
      let array2 = Pokemon.findAll({
        attributes: ["name", "imagen", "str"],
        include: Type,
      });
      return Promise.all(array1.concat(array2));
    })
    .then((response) => {
      let API = response.splice(0, limitAxios).map(partInfoGetter);
      let DB = response[0].map((poke) => {
        return {
          id: poke.id,
          name: poke.name,
          img: poke.imagen,
          str: poke.str,
          type: poke.types.map((relation) => relation.type),
        };
      });
      return res.status(201).json([...DB, ...API ]);
    })
    .catch((e) => next(e));
}

function getPokemonByIdoName(req, res, next) {
  let idParams = req.params.idPokemon;
  if (isNaN(idParams)) {
    let namePoke = idParams.toLowerCase()
    let findedDB = Pokemon.findOne({
      where: {
        name: namePoke,
      },
      include: Type,
    });
    let findedAPI = axios.get(`${API_URL}/${namePoke}`);
    Promise.allSettled([findedDB, findedAPI])
      .then((response) => {
        if (response[1].status === "fulfilled") {
          //Api
          return res.send(fullInfoGetter(response[1].value));
        }
        if (response[0].value) {
          //db
          let pokemon = InfoGetterDB(response[0].value);
          return res.send(pokemon);
        } else {
          return res
            .status(404)
            .send("does not exist a pokemon with that name");
        }
      })
      .catch((e) => next(e));
  } else {
    let idParams = req.params.idPokemon;
    if (idParams % 1 === 0) {
      //revisar
      axios
        .get(`${API_URL}/${idParams}`)
        .then(fullInfoGetter)
        .then((response) => res.send(response))
        .catch((e) => next(e));
    } else {
      Pokemon.findOne({
        where: {
          id: idParams,
        },
        include: Type,
      })
        .then((pokefind) => {
          let finded = InfoGetterDB(pokefind);
          res.send(finded);
        })
        .catch((e) => next(e));
    }
  }
}

function postPokemon(req, res, next ){
    Promise.allSettled(promiseGenerator(req,API_URL))
    .then(response => {
        if(response[2].value){
            throw new Error ("you can't create a pokemon that exists");
        }
        //console.log("hola", response[0])
        let typesIds = response[0].value.map(value => {
            return value.dataValues.id;
        });
        let obj = {
            pCreated : response[1].value,
            typesIds
        }
        return obj;
    })
    .then(obj => {
        const {pCreated,typesIds} = obj;
        pCreated.addTypes(typesIds);
        res.status(201).json(pCreated);
    })
    .catch(e=>next(e))
    
}

module.exports = {
  getAllPokemon,
  getPokemonByIdoName,
  postPokemon
};
