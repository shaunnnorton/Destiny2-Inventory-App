import api from "./api_calls.js"

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
        //console.log(lastOnDateMS)
        let LOD = new Date(lastOnDateMS)
        clan.members[i].lastOnline = LOD.toLocaleString()
    }

    return true
}

const translate_inventory_items = async player => {
    //console.log(player)
    let inventory = []
    for(let char in player.characterEquipment.data){
        let char_number = char
        console.log(player.profile.data.userInfo.membershipType)
        let player_info = await api.character_info(char_number,player.profile.data.userInfo.membershipType,player.profile.data.userInfo.membershipId)
        console.log(player_info)
        let t_items = []
        for(let i in player.characterEquipment.data[char].items){
            let item = player.characterEquipment.data[char].items[i]
            //console.log(item.itemHash)
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



module.exports = {translate_clan_members, translate_inventory_items}