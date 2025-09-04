//imports and config
const express = require("express")
const mongoose = require("mongoose")
const dotenv= require("dotenv")
const Player = require("./models/player")
dotenv.config()
const methodOverride = require("method-override")
const morgan = require("morgan")

//constants
const PORT = 3000

//create instance of the application
const app = express()

//add middleware
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

//connect to database
const connect = async ()=> {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")
}

connect()

//routes
    app.get(`/`,(req,res)=> {
        res.render("index.ejs")
    })

app.get(`/players`, async (req,res)=> {
    const allPlayers = await Player.find()
    // console.log(allPlayers)
    res.render("./players.ejs",{players:allPlayers})
})

app.get(`/players/new`,(req,res)=> {
    res.render("new.ejs")
})

app.post(`/players`, async (req,res)=> {
    // console.log(req.body)
    await Player.create(req.body)
    res.redirect("./players/new")
})

app.get(`/players/:id`,async (req,res)=> {
    const id = req.params.id
    // console.log(id)
    const foundId = await Player.findById(id)
    res.render("./show.ejs",{player:foundId})
})

app.get(`/players/:id/edit`,async (req,res)=> {
    const foundPlayer = await Player.findById(req.params.id) 
    // console.log(foundPlayer)
    res.render("./edit.ejs",{
        player: foundPlayer
    })
})

app.put(`/players/:id`, async (req,res)=> {
    await Player.findByIdAndUpdate(req.params.id,req.body)
    // console.log(req.body)
    res.redirect(`/players/${req.params.id}`)
})

app.delete(`/players/:id`, async (req,res)=> {
    await Player.findByIdAndDelete(req.params.id)
    res.redirect(`/players`)
})


//listen
app.listen(PORT,() =>{
    console.log(`I am listening on port ${PORT}`)
})