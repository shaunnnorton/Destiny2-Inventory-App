#This is an Early textbased Version of this app to be run in command line and is no longer accurate!
from player_characters import Player_Characters
from clan_info import Clan_Info
import json
class Player(Player_Characters,Clan_Info):
    def __init__(self,gamertag):
        Player_Characters.__init__(self,gamertag)
        Clan_Info.__init__(self,gamertag)
        self.operation()

    def operation(self):
        cont = True
        while cont == True:
            print("Hello what would you like to do?")
            print('[1]View clan information')
            print('[2]View Character information')
            print('[3]Close')
            action = input("Press a number and hit Enter: ")
            print('-----------------------------------------------------')
            if(int(action) == 1):
                print()
                print(self.clan_name)
                print(f'Clan Members {self.member_count}')
                print(f'Clan level {self.clan_level}')
                print()
                for player in self.get_player_status():
                    print(player)
                input('Press enter to Continue.')
                print('-----------------------------------------------------')
            if(int(action)== 2):
                print("What Character Would you like to see?")
                print(f'[1]{self.Characters_index[0]}')
                print(f'[2]{self.Characters_index[1]}')
                print(f'[3]{self.Characters_index[2]}')
                choice = input('Press a number and hit Enter: ')
                print('-----------------------------------------------------')
                print(f"Your {self.Characters_index[int(choice)-1]}'s light is {self.Characters[self.Characters_index[int(choice)-1]]['Light']}'")
                print('The following items are equiped on your character:')
                print('-----------------------------------------------------')
                for _ in self.Characters[self.Characters_index[int(choice)-1]]['Equipment']:
                    print(_)
                input("Press enter to continue.")
                print('-----------------------------------------------------')
            if(int(action)==3):
                cont = False
