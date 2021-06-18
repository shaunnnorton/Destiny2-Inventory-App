import axios from "axios";
require("dotenv").config();

let API_KEY = process.env.APIKEY;

const get_id = (player_string) => {
    axios
        .get(
            `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer` +
                `/-1/${player_string}`,
            { headers: { "X-API-KEY": API_KEY } }
        )
        .then((res) => {
            //console.log(res.data.Response);
            return res.data["Response"];
        })
        .catch((err) => {
            console.log(err);
        });
};

const get_profile = (mem_type, id) => {
    axios
        .get(
            `https://www.bungie.net/Platform/Destiny2/${String(
                mem_type
            )}/Profile/` + `${String(id)}/?components=100,205`,
            { headers: { "X-API-KEY": API_KEY } }
        )
        .then((res) => {
            return res.data.Response;
        })
        .catch((err) => {
            console.log(err.response);
        });
};

const get_clan = async (id) => {
    let info = {};
    let res1 = await axios.get(
        `https://www.bungie.net/Platform/GroupV2/User/1/${id}/0/1/`,
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
 * @param {Array} data - Array of users from clan call
 * @param {Object} info_store - the Object to store the member information
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

const manifest_call = async (hash, type) => {
    types = {
        "class":"DestinyClassDefinition",
        "equipment":"DestinyInventoryItemDefinition"
    }
}


module.exports = { get_id, get_profile, get_clan };
