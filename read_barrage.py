import pandas as pd
import json

size = 50

def get_list():
    return pd.read_csv('barrage.csv')['content']

def get_list_json():

    list = pd.read_json('barrage.json')['i']['d'][0:size]
    #for i in list:
        #print(i['_'] )
    return [i['_'] for i in list]
