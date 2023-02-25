// Imports
import axios from "axios";
require("dotenv").config(); //Initilize ENV 

let API_KEY = process.env.APIKEY; // Get API key

/**
 * Function to make an API call and return player's IDs
 * @param {string} player_string - username of the player to search for
 * @returns {object} Object containing useful information such as "DisplayName", "MemberType", "MembershipID"
 */
const get_id = async (player_string) => {
    let id = await axios
        .post(
            `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1`,{displayName:"docthunder58",displayNameCode:"9451"},
            { headers: { "X-API-KEY": API_KEY }}
        )
    console.log(id.data)
    return id.data.Response
};

/**
 * Function to make and API call and return profile
 * @param {string} mem_type - bungie Membership Type (provided by get_id())
 * @param {string} id - bungie Membership Id (provided by get_id())
 * @returns {object} Contains data from api call including last online and raw character data
 */
async function get_profile(mem_type, id) {
    const profile = await axios
        .get(
            `https://www.bungie.net/Platform/Destiny2/${String(
                mem_type
            )}/Profile/` + `${String(id)}/?components=100,205`,
            { headers: { "X-API-KEY": API_KEY } }
        )
    return profile.data
};

/**
 * Makes an API call for the clan of a member
 * @param {string} mem_id - Bungie membership Id (provided by get_id()) 
 * @returns {object} - Object containing the members of a clan as well as clan name and desctiption.
 */
const get_clan = async (mem_id) => {
    let info = {};
    let res1 = await axios.get(
        `https://www.bungie.net/Platform/GroupV2/User/1/${mem_id}/0/1/`,
        {
            headers: { "X-API-KEY": API_KEY },
        }
    );
    info["name"] = res1.data.Response.results[0].group.name;
    info["desc"] = res1.data.Response.results[0].group.about;
    info["clan_id"] = res1.data.Response.results[0].group.groupId;
    let res2 = await axios.get(
        `https://www.bungie.net/Platform//GroupV2/${info.clan_id}/Members/`,
        {
            headers: { "X-API-KEY": API_KEY },
        }
    );
    let new_info = await grab_members(res2.data.Response.results, info);
    return new_info
};
/**
 * Cleans the data from a clan call
 * @param {Array} data - Array of users from clan call
 * @param {Object} info_store - the Object to store the member information
 * @returns {object} returns the data array with members modified to include membertype, name, online, and lastOnline
 */
const grab_members = async (data, info_store) => {
    info_store.members = [];
    for (let i = 0; i < data.length; i++) {
        info_store.members.push({
            memType: data[i].memberType,
            name: data[i].destinyUserInfo.displayName,
            online: data[i].isOnline,
            lastOnline: data[i].lastOnlineStatusChange,
        });
    }
    return info_store;
};

/**
 * Makes API call to bungie Manifest
 * @param {string} hash - Hash to query the Manifest for 
 * @param {string} type - Type of to search the Manifest for Class or Equipment
 * @returns {object} Object containing the name and icon of the item matching the hash
 */
const manifest_call = async (hash, type) => {
    let types = {
        "class":"DestinyClassDefinition",
        "equipment":"DestinyInventoryItemDefinition"
    }
    let response = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/${types[type]}/${hash+""}/`,{ headers: { "X-API-KEY": API_KEY } })
    return {
        "name":response.data.Response.displayProperties.name,
        "icon":response.data.Response.displayProperties.icon,
        }

}

/**
 * Makes and API call to get the light and class of a character
 * @param {string} char_id - The id of the character to query for
 * @param {string} mem_type - The membership type of the player to query for
 * @param {string} mem_id - The membership id of the player to query for
 * @returns {object} Object containing the character data class and light
 */
const character_info = async (char_id, mem_type, mem_id) => {
    let character = {}
    let response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${mem_type}/Profile/${mem_id}/Character/${char_id}/?components=200`,{ headers: { "X-API-KEY": API_KEY } })
    character["light"]=response.data.Response.character.data.light
    let type = await manifest_call(response.data.Response.character.data.classHash,"class")
    character["class"] = type.name
    return character
}

module.exports = { get_id, get_profile, get_clan, manifest_call, character_info };
