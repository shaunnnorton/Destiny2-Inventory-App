import requests
import json
from player_info import Player_Info
from manifest_info import Manifest
from enviornment import APIKEY


class Player_Characters(Player_Info, Manifest):
    def __init__(self,gamertag):
        super().__init__(gamertag)
        Manifest.__init__(self)
        self.__Character1_raw = {}
        self.__Character2_raw = {}
        self.__Character3_raw = {}
        self.__Characters_raw = {}
        self.Character1 = {}
        self.Character2 = {}
        self.Character3 = {}
        self.Characters = dict()
        self.get_character_info()
        self.make_dict()
        self.set_light()
        self.translate_classes()
        self.Characters_index = self.character_index()
        self.character_equipment()
    def get_character_info(self):
        profile = self.profile      
        HEADERS = {"X-API-Key":APIKEY}
        index = 0
        for  _ in profile['Response']['profile']['data']['characterIds']:
            
            response = requests.get(f'https://www.bungie.net/Platform//Destiny2/{self.memtype}/Profile/{self.member_id}/Character/{_}/?components=200,205',headers=HEADERS)
            character = response.json()
            if(index == 0):
                self.__Character1_raw = character
            if(index == 1):
                self.__Character2_raw = character
            if(index == 2):
                self.__Character3_raw = character
            index += 1
        self.Characters_raw = {1:self.__Character1_raw, 2:self.__Character2_raw, 3:self.__Character3_raw}
    
    def translate_class(self,char_number):
        hash = self.Characters_raw[char_number]["Response"]['character']['data']['classHash']
        #print(self._all_data['DestinyClassDefinition'][hash]['displayProperties']['name'])
        return self._all_data['DestinyClassDefinition'][hash]['displayProperties']['name']
    
    def make_dict(self):
        self.Characters[self.translate_class(1)] = self.Character1
        self.Characters[self.translate_class(2)] = self.Character2
        self.Characters[self.translate_class(3)] = self.Character3

    def translate_classes(self):
        self.Character1['Class'] = self.translate_class(1)
        self.Character2['Class'] = self.translate_class(2)
        self.Character3['Class'] = self.translate_class(3)

        

    def set_light(self):
        self.Character1['Light'] = self.__Character1_raw['Response']['character']['data']['light']
        self.Character2['Light'] = self.__Character2_raw['Response']['character']['data']['light']
        self.Character3['Light'] = self.__Character3_raw['Response']['character']['data']['light']

    def character_index(self):
        return list(self.Characters.keys())

    def translate_equipment(self,smash):
        hash = smash
        #print(self._all_data['DestinyInventoryItemDefinition'][hash])
        return self._all_data['DestinyInventoryItemDefinition'][hash]['displayProperties']['name']
        
    
    def character_equipment(self):
        temporatylist = []
        counter = 0
        for _ in self.__Character1_raw['Response']['equipment']['data']['items']:
            temporatylist.append(self.translate_equipment(self.__Character1_raw['Response']['equipment']['data']['items'][counter]['itemHash']))
            counter += 1
        self.Character1['Equipment'] = temporatylist
        temporatylist = []
        counter = 0
        for _ in self.__Character2_raw['Response']['equipment']['data']['items']:
            temporatylist.append(self.translate_equipment(self.__Character2_raw['Response']['equipment']['data']['items'][counter]['itemHash']))
            counter += 1
        self.Character2['Equipment'] = temporatylist
        temporatylist = []
        counter = 0
        for _ in self.__Character3_raw['Response']['equipment']['data']['items']:
            temporatylist.append(self.translate_equipment(self.__Character3_raw['Response']['equipment']['data']['items'][counter]['itemHash']))
            counter += 1
        self.Character3['Equipment'] = temporatylist



