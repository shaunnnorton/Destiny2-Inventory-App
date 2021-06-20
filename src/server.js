require("dotenv").config()

import express from "express"
import handlebars from "express-handlebars"
import routes from "./routes/index.js"


const app = express()
app.use(express.static(__dirname + "/public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set("view engine", 'handlebars')
app.set("views", "./src/views")


let port = process.env.PORT

app.use("/",routes.main)
app.use("/",routes.data)



app.listen(port, () => {
    console.log(`Destiny app listening on port ${port}`)
})