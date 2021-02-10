from dotenv import load_dotenv
import os

load_dotenv()

APIKEY = os.environ.get("APIKEY")
SECRET_KEY = os.environ.get("SECRET_KEY")
