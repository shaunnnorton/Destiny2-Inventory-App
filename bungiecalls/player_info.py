import json
import requests
from enviornment import APIKEY


class Player_Info:    
    def __init__(self,gamertag):
        self.gamertag = gamertag
        self.info_gamertag = self.get_info_gamertag()
        self.member_id = self.get_memid()
        self.memtype = self.get_memtype()
        self.profile = self.get_Profile()
    def get_info_gamertag(self):
        """Gets information realated to the gamertag that was initialized"""
        HEADERS = {"X-API-Key":APIKEY}
        response = requests.get(f'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/{self.gamertag}', headers=HEADERS)
        player_info = response.json()
        
        return player_info['Response']

    def get_memid(self):
        '''Returns the membership ID of the player'''
        player_info = self.get_info_gamertag()
        #print(player_info[0])
        return player_info[0]["membershipId"]

    def get_memtype(self):
        '''Returns the membership type of the player'''
        player_info = self.get_info_gamertag()
        #print(player_info[0]["membershipType"])
        return player_info[0]["membershipType"]

    def get_memberships(self):
        '''Returns membership info of the player'''
        HEADERS={"X-API-Key":APIKEY}
        response= requests.get(f"https://www.bungie.net/Platform/User/GetMembershipsById/{self.member_id}/-1/",headers=HEADERS)
        memberships = response.json()       
        #print(json.dumps(memberships, indent=4))
        return memberships

    def get_Profile(self):
        '''Returns basic profile information of the player'''
        player_id = self.member_id
        membership_Type = self.memtype
        HEADERS = {"X-API-Key":APIKEY}
        response = requests.get(f'https://www.bungie.net/Platform/Destiny2/{membership_Type}/Profile/{player_id}/?components=100,205', headers=HEADERS)
        profile = response.json()
        return profile