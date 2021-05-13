import json
import requests
import time
from bungiecalls.player_info import Player_Info
from enviornment import APIKEY



class Clan_Info(Player_Info):
    '''Class to find information regarding a clan provided a gamertag'''
    def __init__(self,gamertag):
        super().__init__(gamertag)
        self.clan = self.find_clan()
        self.clan_name = ''
        self.member_count = int()
        self.clan_level = int()
        self.clan_details()

    def find_clan(self):
        '''Finds the clan of the provided player. Returns json response.'''
        member = self.member_id
        HEADERS = {"X-API-Key":APIKEY}
        response = requests.get(f'https://www.bungie.net/Platform/GroupV2/User/1/{member}/0/1/', headers=HEADERS)
        clan_info = response.json()
        #print(clan_info)
        return clan_info

    def get_player_status(self):
        '''Prints all players of the clan with online status'''
        clan_members = list()
        clan = self.clan
        clan_id = clan["Response"]["results"][0]["group"]["groupId"]
        HEADERS = {"X-API-Key":APIKEY}
        r = requests.get(f'https://www.bungie.net/Platform//GroupV2/{clan_id}/Members/', headers=HEADERS)
        clan = r.json()
        player_number = 0
        for _ in clan['Response']['results']:
            player = clan['Response']['results'][player_number]['destinyUserInfo']['LastSeenDisplayName']
            status = clan['Response']['results'][player_number]['isOnline']
            last_online = time.strftime("%a, %b %d %Y %I:%M:%S %p",time.localtime(int(clan["Response"]["results"][player_number]["lastOnlineStatusChange"])))
            member_type_store = clan['Response']['results'][player_number]['memberType']
            member_type = ''
            if(member_type_store == 5 or member_type_store == 4):
                member_type = 'Founder'
            elif (member_type_store == 3):
                member_type= "Admin"
            elif (member_type_store == 2):
                member_type = 'Member'
            else:
                member_type = 'Begginner'
            
            clan_members.append({'member_type':member_type ,'name':player,'last_online':last_online,'status':status})
  
            # #print(last_online)
            # #print(member_type)
            # if status == False:
            #     #print(f"Clan {member_type} {player} was last online at {last_online}")
            #     #clan_members.append(f"Clan {member_type} {player} was last online at {last_online}")

            # else:
            #     # print(f"Clan {member_type} {player} is Online")
            #     clan_members.append(f"Clan {member_type} {player} is Online")
            player_number+=1
        return clan_members
    def clan_details(self):
        self.clan_name = self.clan['Response']['results'][0]['group']['name']
        self.member_count = self.clan['Response']['results'][0]['group']['memberCount']
        self.clan_level = self.clan['Response']['results'][0]['group']['clanInfo']['d2ClanProgressions']['584850370']['level']
        