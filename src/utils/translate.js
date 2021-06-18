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
        console.log(lastOnDateMS)
        let LOD = new Date(lastOnDateMS)
        clan.members[i].lastOnline = LOD.toLocaleString()
    }

    return true
}



module.exports = {translate_clan_members}