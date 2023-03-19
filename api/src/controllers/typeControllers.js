require("dotenv").config();
const axios = require('axios');
const {Type} = require('../db');
const { API_URL_TYPE } = process.env;

let flag = true
function getTypes (req,res,next){
    if (flag){
        return axios.get(API_URL_TYPE)
        .then(response=>{
            response.data.results.forEach(type=>{
                Type.create({
                    type: type.name
                })
            })
        })
        .then(()=> {
            flag = false
            return res.sendStatus(200)
        })
        .catch(e=>next(e))
    }
    return res.sendStatus(208)
}

function getDBTypes (req,res,next){
    Type.findAll()
    .then((response)=> res.send(response))
    .catch(e=>next(e))
}

module.exports = {
    getTypes,
    getDBTypes
}