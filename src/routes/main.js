import { Router } from "express";

const router = Router()

router.get("/", (req,res) => {
    res.render("home")
})

router.get("/<username>", (req,res) =>{
    res.send("Not Implemented")
})



export default router