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

app.get("/", async (req,res) => {
    const id = await calls.get_id("Docthunder58")
    //console.log(await calls.get_profile('1','4611686018444606398'))
    const profile = await calls.get_profile('1','4611686018444606398')
    const iv = await translate.translate_inventory_items(profile)
    const clan = await calls.get_clan('4611686018444606398')
    //await console.log([id,profile.characters,clan])
    //await res.send(iv)

})
async function Test() {
    calls.get_profile('1','4611686018444606398')
        .then(profile => {console.log(profile)})
}

//Test()


app.listen(port, () => {
    console.log(`Destiny app listening on port ${port}`)
})