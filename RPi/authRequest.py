import os
from os.path import join, dirname
from dotenv import load_dotenv
import requests
import json

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
def getRequest(link):
    print(link)
    '''
    link should be http://carttech.tech/api/stores or something
    '''
    SECRET_KEY = os.environ.get("CLIENT_SECRET")
    url = 'https://dev-it2no-e1.us.auth0.com/oauth/token'
    payload = {"client_id":"kL7Phts9sMbrwODB1py2YDBiPP14NiQR","client_secret":SECRET_KEY,"audience":"https://cart-tech","grant_type":"client_credentials"}
    response = requests.post(url, data = payload, headers = {"HTTP_HOST": "MyVeryOwnHost"}) #headers = { 'content-type': "application/json" }
    token = json.loads(response.text)['access_token']

    headers2 = { 'authorization': "Bearer "+ token}
    response2 = requests.get(link, headers = headers2)
    return json.loads(response2.text)

