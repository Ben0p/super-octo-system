import pymongo
from bson.json_util import dumps
import json



# Initialize mongo
client = pymongo.MongoClient('mongodb://10.1.1.94:27017/')
db = client['super-octo-system']



def read(ip):
    
    # Initialize 
    c = ModbusClient(host=ip, port=502, auto_open=True, timeout=1)

    try:
        # Read the outputs again
        bits = c.read_coils(16, 6)


def trigger():



def run():

    # Get details from db
    outputs = db['outputs'].find()
    modules = db['modules'].find()

    for module in modules:
        # Get modules ip
        ip = module['ip']

        # Get current states
        states = read(ip)


    # Check if set is different

    # Change output to match set value

    

    for document in documents:
        if document['set'] == True:




if __name__ == '__main__':
    run()