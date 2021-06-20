import { Router } from "express";
import api_calls from "../utils/api_calls.js"
import translations from "../utils/translate.js"


const router = Router()

router.post("/:username/characters",async (req,res) =>{
    const characters = await translations.translate_inventory_items(req.body.player)
    res.send(characters)
})

router.post("/:username/id",async (req,res) =>{
    const id = await api_calls.get_id(req.params.username).catch(err => {
        console.log(err)
    })
    //console.log(profile[0])
    res.send(id[0])
})

router.post("/:username/profile", async (req,res) => {
    let type = req.body.type
    let id = req.body.id
    //console.log([req,type,id])
    let profile = await api_calls.get_profile(type,id)
    console.log(profile)
    res.send(profile)
})

router.post("/:username/clan",async (req,res) =>{
    //console.log(req.body.member_id)
    let clan_raw = await api_calls.get_clan(req.body.member_id)
    //console.log(clan_raw)
    let clan = await translations.translate_clan_members(clan_raw)
    //console.log(clan_raw)
    res.send(clan_raw)
})


export default router