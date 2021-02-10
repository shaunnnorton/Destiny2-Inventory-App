from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField
from wtforms.validators import DataRequired

class GamerTagForm(FlaskForm):
    gamertag = StringField("Gamertag",validators=[DataRequired()])
    submit = SubmitField("Go")