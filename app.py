from flask import Flask, request, render_template
from bungiecalls.clan_info import Clan_Info
from bungiecalls.player_characters import Player_Characters
from Forms import GamerTagForm
from enviornment import SECRET_KEY

app = Flask(__name__)
app.secret_key = SECRET_KEY

@app.route("/",methods=['GET','POST'])
def home():
    form = GamerTagForm()
    if form.validate_on_submit():
        clan = Clan_Info(form.gamertag.data)
        clan_members = clan.get_player_status()
        clan_name = clan.clan_name

        player = Player_Characters(form.gamertag.data)
        characters = player.Characters
        context = {
            'form':form,
            'clan_name':clan_name,
            'clan_members':clan_members,
            'characters':characters,
            'player':player
        }

    else:
        clan = None
        clan_members = list()
        clan_name = None
        context = {
            'form':form,
            'clan_name':None,
            'clan_members':list(),
            'characters':list(),
            'player':None
        }
        
    
    return render_template('home.html',**context)

@app.route('/<username>')
def player(username):
    form = GamerTagForm()
    clan = Clan_Info(username)
    clan_members = clan.get_player_status()
    clan_name = clan.clan_name

    player = Player_Characters(username)
    characters = player.Characters
    context = {
        'form':form,
        'clan_name':clan_name,
        'clan_members':clan_members,
        'characters':characters,
        'player':player
    }
    return render_template('home.html',**context)



if __name__ == '__main__':
    app.run(debug=True)
