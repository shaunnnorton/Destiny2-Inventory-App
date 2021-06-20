const axios = window.axios

let username_input = document.querySelector(".username")
let username_button = document.querySelector(".user_button")
let script_holder = document.querySelector(".script_holder")

let equipment_container = document.querySelector("#Equipment")
let clan_container = document.querySelector("#Clan")
let profile = Object()
let member_id = ''
let member_type = ''
let display_name = ''
let clan = Object()
let characters = Object()

console.log(script_holder)

username_button.addEventListener("click",populate_data)



function update_equipment() {
    equipment_container.innerHTML = ""
    let equipment_title = document.createElement("h1") //id_equipment_label
    let equipment_list_contain= document.createElement("div") //id_equipment_list
    equipment_title.id = "equipment_label"
    equipment_list_contain.id = "equipment_list"
    equipment_title.classList.add("row","text-center","font-weight-bold")
    equipment_title.innerHTML = display_name
    equipment_list_contain.classList.add("list-group", "container")
    for(let char in characters) {
        let character_button = document.createElement('button')
        character_button.classList.add("equipment_item", "list-group-item", "list-group-item-action", "row", "text-center")
        character_button.innerHTML = `${characters[char].class} ${characters[char].light}`
        let character_list = document.createElement("ul")
        character_list.classList.add("row", "equipment_list_items", "list-group")
        character_list.style.display = "none"
        for(let item in characters[char].items) {
            //console.log(characters[char].items[item])
            let list_element = document.createElement("li")
            list_element.classList.add("col", "list-group-item")
            list_element.innerHTML = `<img src=http://www.bungie.net${characters[char].items[item].icon}>` + `<strong>${characters[char].items[item].name}</strong>` 
            character_list.appendChild(list_element)
        }
        equipment_list_contain.appendChild(character_button)
        equipment_list_contain.appendChild(character_list)
       
    }
    equipment_container.appendChild(equipment_title)
    equipment_container.appendChild(equipment_list_contain)
}

function update_clan() {
    clan_container.innerHTML = ""
    let clan_label= document.createElement("h1")
    clan_label.id = "clan_name"
    clan_label.classList.add("row")
    clan_label.innerHTML = clan.name
    let clan_div = document.createElement("div")
    clan_div.id = "players"
    clan_div.classList.add("list-group","row")
    for(let member in clan.members){
        let member_label = document.createElement("p")
        member_label.classList.add("clan_member","list-group-item-action","list-group-item")
        if(clan.members[member].online == true) {
            member_label.innerHTML = `<i>[${clan.members[member].memType}]</i> <strong>${clan.members[member].name}</strong> is online</a>`
        }else{
            member_label.innerHTML = `<i>[${clan.members[member].memType}]</i> <strong>${clan.members[member].name}</strong> is Offline (${clan.members[member].lastOnline})</a>`
        }
        clan_div.appendChild(member_label)
        
    } 
    clan_container.appendChild(clan_label)
    clan_container.appendChild(clan_div)
}


async function populate_data() {
    let remove_script = document.getElementById("MAINSCRIPT")
    if(remove_script) {
        remove_script.remove()
    }
    let username = username_input.value
    await get_id(username)
    await get_profile(username)
    await get_clan(username)
    await get_characters(username)
    //console.log([member_id,member_type,display_name,characters,clan])
    update_equipment()
    update_clan()
    let manage_script = document.createElement("script")
    manage_script.src = "scripts/main.js"
    manage_script.id = "MAINSCRIPT"
    script_holder.insertAdjacentElement("afterend",manage_script)
    return true
}

async function get_id(username) {
    let id = await axios.post(`/${username}/id`).catch(err => console.log(err))
    member_id = id.data.membershipId
    member_type = id.data.membershipType
    display_name = id.data.displayName
    //console.log([member_id,member_type,display_name])
}

async function get_profile(username) {
    let user = await axios.post(`/${username}/profile`,{type:member_type, id:member_id})
    profile = user.data
    //console.log(user.data)
}

async function get_clan(username) {
    let response = await axios.post(`/${username}/clan`,{member_id:member_id}).catch(err => console.log(err))
    //console.log(response)
    clan = response.data

}

async function get_characters(username) {
    //await get_profile("Docthunder58")
    let response = await axios.post(`/${username}/characters`,{player:profile}).catch(err => console.log(err))
    characters = response.data
}
