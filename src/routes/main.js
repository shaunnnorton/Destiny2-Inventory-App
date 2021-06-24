//Imports
import { Router } from "express";

// Initializes Router
const router = Router()

//--------------------------------ROUTES---------------------------------------


// Route to render the page with no gamertag provided
router.get("/", (req,res) => {
    let gamertag = null
    res.render("home", {gamertag})
})

// Router to render the home page with a gamertag provided
router.get("/:username", (req,res) =>{
    res.render("home", {gamertag:req.params.username})
})

//--------------------------------ROUTES---------------------------------------


export default router