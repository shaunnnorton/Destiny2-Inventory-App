require("dotenv").config()

import express from "express"
import handlebars from "express-handlebars"
import calls from "./utils/api_calls.js"
import translate from "./utils/translate.js"


const app = express()
app.use(express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set("view engine", 'handlebars')
app.set("views", "./src/views")


let port = process.env.PORT

app.get("/", (req,res) => {
    calls.get_id("Docthunder58")
    calls.get_profile('1','4611686018444606398')
    calls.get_clan('4611686018444606398')
    .then(result => {
        translate.translate_clan_members(result)
    })
    
    
    res.send("fuck")
})

app.listen(port, () => {
    console.log(`Destiny app listening on port ${port}`)
})