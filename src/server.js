// Import and Set Enviornment Variables
require("dotenv").config()
// Imports
import express from "express"
import handlebars from "express-handlebars"
import routes from "./routes/index.js" // Imports the routes for the server

// Initialize App
const app = express()
app.use(express.static(__dirname + "/public")) //Set Route for static files
//Set middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set("view engine", 'handlebars')
app.set("views", "./src/views")

// Sets the routes from the routes files.
app.use("/",routes.main)
app.use("/",routes.data)


let port = process.env.PORT //Sets the port the server will listen to

app.listen(port, () => {
    console.log(`Destiny app listening on port ${port}`)
})