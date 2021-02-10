import requests, zipfile, os, pickle, json, sqlite3
class Manifest:  
    def __init__(self):
        print("Manifest INIT")
        #---------------------------------------------------------------------------------
        #START Code written by JAMeador13 for community use at http://destinydevs.github.io/BungieNetPlatform/docs/Manifest && By jam-time at
        # https://github.com/DestinyDevs/BungieNetPlatform/issues/8  ----------
        #----------------------------------------------------------------------------------
        
        
        self._all_data = dict()
        self.hashes = [
            "DestinyEnemyRaceDefinition",
            "DestinyPlaceDefinition",
            "DestinyActivityDefinition",
            "DestinyActivityTypeDefinition",
            "DestinyClassDefinition",
            "DestinyGenderDefinition",
            "DestinyInventoryBucketDefinition",
            "DestinyRaceDefinition",
            "DestinyStatDefinition",
            "DestinyTalentGridDefinition",
            "DestinyUnlockDefinition",
            "DestinySandboxPerkDefinition",
            "DestinyStatGroupDefinition",
            "DestinyFactionDefinition",
            #"DestinyVendorCategoryDefinition",
            "DestinyRewardSourceDefinition",
            "DestinyItemCategoryDefinition",
            "DestinyDamageTypeDefinition",
            "DestinyActivityModeDefinition",
            "DestinyMedalTierDefinition",
            "DestinyActivityGraphDefinition",
            "DestinyItemTierTypeDefinition",
            "DestinyBondDefinition",
            "DestinyDestinationDefinition",
            "DestinyInventoryItemDefinition",
            "DestinyLocationDefinition",
            "DestinyLoreDefinition",
            "DestinyObjectiveDefinition",
            "DestinyProgressionDefinition",
            "DestinyProgressionLevelRequirementDefinition",
            "DestinySackRewardItemListDefinition",
            "DestinySocketCategoryDefinition",
            "DestinySocketTypeDefinition",
            "DestinyVendorDefinition",
            "DestinyMilestoneDefinition",
            "DestinyActivityModifierDefinition",
            "DestinyHistoricalStatsDefinition"
        ]

        
         #check if pickle exists, if not create one.
        
        if os.path.isfile('./Manifests/d2Manifest.content') == False:
            self.__get_manifest()
            self._all_data = self.__build_dict(self.hashes)
            with open('./Manifests/d2manifest.pickle', 'wb') as data:
                pickle.dump(self._all_data, data)
                print("'d2manifest.pickle' created!\nDONE!")
        else:
            print('Pickle Exists')

        with open('./Manifests/d2manifest.pickle', 'rb') as data:
            self._all_data = pickle.load(data)

        

    

    
    
    
    def __get_manifest(self):
        manifest_url = 'http://www.bungie.net/Platform/Destiny2/Manifest/'

        #get the manifest location from the json
        r = requests.get(manifest_url)
        manifest = r.json()
        #print(manifest)HOLY SHIT DONT DO THIS IF YOU LOVE YOUR COMPUTER
        mani_url = 'http://www.bungie.net'+manifest['Response']['mobileWorldContentPaths']['en']

        #Download the file, write it to 'MANZIP'
        r = requests.get(mani_url)
        with open("./Manifests/MANZIP", "wb") as zip:
            zip.write(r.content)
        print("Download Complete!")

        #Extract the file contents, and rename the extracted file
        # to 'Manifest.content'
        with zipfile.ZipFile('./Manifests/MANZIP') as zip:
            name = zip.namelist()
            zip.extractall()
        os.rename(name[0], './Manifests/d2Manifest.content')
        print('Unzipped!')

    
    def __build_dict(self,hash_list):
        con = sqlite3.connect('./Manifests/d2Manifest.content')
        cur = con.cursor()
        all_data = {}

        for table_name in hash_list:
            cur.execute('SELECT json from '+table_name)
            items = cur.fetchall()
            item_jsons = [json.loads(item[0]) for item in items]

            item_dict = {}

            for item in item_jsons:
                if table_name == 'DestinyHistoricalStatsDefinition':
                    item_dict[item["statId"]] = item
                else:
                    item_dict[item["hash"]] = item

            all_data[table_name] = item_dict

        return all_data

            #add that dictionary to our all_data using the name of the table
            #as a key.
            
      
    #--------------------------------------------------------------------------------
    #End code repurposed from community
    #--------------------------------------------------------------------------------
    