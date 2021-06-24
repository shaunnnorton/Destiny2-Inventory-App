//Imports
import { Router } from "express";
import api_calls from "../utils/api_calls.js"
import translations from "../utils/translate.js"

// Initializes Router
const router = Router()
//--------------------------------ROUTES---------------------------------------

// Route returning an object containing character information for a player
router.post("/:username/characters",async (req,res) =>{
    const characters = await translations.translate_inventory_items(req.body.player)
    res.send(characters)
})

// Route returning an object containing the id information of the username
router.post("/:username/id",async (req,res) =>{
    const id = await api_calls.get_id(req.params.username).catch(err => {
        console.log(err)
    })
    res.send(id[0])
})

// Route returning an object containing the profile information from the
// type and id prvided
router.post("/:username/profile", async (req,res) => {
    let type = req.body.type
    let id = req.body.id
    let profile = await api_calls.get_profile(type,id)
    res.send(profile)
})
// Route returning an object containing the clan information from memberid
// provided
router.post("/:username/clan",async (req,res) =>{
    let clan_raw = await api_calls.get_clan(req.body.member_id)
    let clan = await translations.translate_clan_members(clan_raw)
    res.send(clan_raw)
})


//-------------------------------END ROUTES-------------------------------------

export default router