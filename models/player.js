//import moongoose
const mongoose = require("mongoose")

//create schema
const playerSchema = new mongoose.Schema({
    name: {type:String, required: true},
    position: String,
    number: Number,
    
})

//define model
const Player = mongoose.model("Player",playerSchema)

//export
module.exports = Player