from flask import Flask, request, render_template
from clan_info import Clan_Info
app = Flask(__name__)

@app.route("/")
def home():
    username=request.args.get('User')
    if username is not None:
        clan = Clan_Info(username)
        clan_members = clan.get_player_status()
        clan_name = clan.clan_name
    else:
        clan = None
        clan_members = list()
        clan_name = None
        
    context = {
        'clan_name':clan_name,
        'clan_members':clan_members
    }
    return render_template('home.html',**context)






if __name__ == '__main__':
    app.run(debug=True)
