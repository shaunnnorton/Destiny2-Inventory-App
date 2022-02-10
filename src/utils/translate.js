// Imports

import api from "./api_calls.js"

/**
 * Translates the role type and lastOnline date of a clan to human readable formats
 * @param {object} clan - clan object to be translated 
 * @returns {boolean} returns true when finished
 */
const translate_clan_members = async (clan) => {
    let roles = {
        "5":"Founder",
        "4":"Founder",
        "3":"Admin",
        "2":"Member",
        "1":"Beginner"
    }
    for(let i=0; i<clan.members.length; i++)
    {
        clan.members[i].memType = roles[clan.members[i].memType]
        let lastOnDateMS = Date.now().valueOf() - Number(clan.members[i].lastOnline)
        let LOD = new Date(lastOnDateMS)
        clan.members[i].lastOnline = LOD.toLocaleString()
    }
    return true
}


/**
 * Translates teh inventory items and character items of a player object to human readable formats
 * @param {object} player - Player object to translate inventory of 
 * @returns {object[]} Array of objects containing characters and their items, class and lights
 */
const translate_inventory_items = async player => {
    let inventory = []
    for(let char in player.characterEquipment.data){
        let char_number = char
        let player_info = await api.character_info(char_number,player.profile.data.userInfo.membershipType,player.profile.data.userInfo.membershipId)
        let t_items = []
        for(let i in player.characterEquipment.data[char].items){
            let item = player.characterEquipment.data[char].items[i]
            let call = await api.manifest_call(item.itemHash,"equipment")
            t_items.push(call)
            
        }
        inventory.push({
                items:t_items,
                class:player_info.class,
                light:player_info.light
            })
    }
    return inventory
}



module.exports = {translate_clan_members, translate_inventory_items} //Export Functions