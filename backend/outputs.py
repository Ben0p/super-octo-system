import pymongo
from bson.json_util import dumps
import json
import time
from pyModbusTCP.client import ModbusClient


# Initialize mongo
client = pymongo.MongoClient('mongodb://10.1.1.94:27017/')
db = client['super-octo-system']


def get():
    # Get list of modules
    modules = db['modules'].find()

    used_modules = []

    # Find outputs in use for each module
    for module in modules:
        used_outputs = db['outputs'].find(
            {
                'parent' : module['parent']
            }
        )

        output_states = []

        for used_output in used_outputs:
            output_states.append(
                {
                    'output' : used_output['output'],
                    'desired' : used_output['set']
                }
            )

        module_target = {
            'ip' :  module['ip'],
            'states' : output_states
        }

        used_modules.append(module_target)

    return(used_modules)


def read(ip):

    # Initialize modbus
    c = ModbusClient(host=ip, port=502, auto_open=True, timeout=1)

    # Read the outputs (Returns None if timeout)
    return(c.read_coils(16, 6))

def write(ip, output, state):
    # Initialize modbus
    c = ModbusClient(host=ip, port=502, auto_open=True, timeout=1)
    coil = output+16
    c.write_single_coil(coil, state)
    print("Set output {} to {} on module ip {}".format(output, state, ip))
    


def update(states):

    for idx, state in enumerate(states):
        db['outputs'].find_one_and_update(
            {
                'output' : idx
            },
            {
                '$set': 
                {
                'state' : state
                }
            },
            upsert = True
        )




def run():
    desired_states = get()
    for module in desired_states:
        if len(module['states']) > 0:
            current_states = read(module['ip'])
            for desired_state in module['states']:
                if desired_state['desired'] != current_states[desired_state['output']]:
                    write(module['ip'], desired_state['output'], desired_state['desired'])






if __name__ == '__main__':
    while True:
        run()
        time.sleep(0.5)