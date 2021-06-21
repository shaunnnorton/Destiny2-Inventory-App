import { Router } from "express";

const router = Router()

router.get("/", (req,res) => {
    let gamertag = null
    res.render("home", {gamertag})
})

router.get("/:username", (req,res) =>{
    res.render("home", {gamertag:req.params.username})
})



export default router