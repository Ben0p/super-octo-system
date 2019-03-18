#! /usr/bin/python3.6
from flask import Flask, jsonify, send_file
from flask_restful import Api, Resource, reqparse
from pyModbusTCP.client import ModbusClient
from flask_cors import CORS
import pymongo
from bson.json_util import dumps
import json
import copy


# Initialize flask
app = Flask(__name__)
api = Api(app)
CORS(app)

# Initialize mongo
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['super-octo-system']


class io_all(Resource):
    def get(self):
        # Get all sign data from the signs collection in mongo
        io = db['io-modules'].find().sort("parent",pymongo.ASCENDING)

        # Return collection as a massive json
        return(jsonify(json.loads(dumps(io))))


class io_detail(Resource):
    def post(self, parent):

        # Blank output array
        outputs = []

        # Parse the form data
        parser = reqparse.RequestParser()
        parser.add_argument("0")
        parser.add_argument("1")
        parser.add_argument("2")
        parser.add_argument("3")
        parser.add_argument("4")
        parser.add_argument("5")

        args = parser.parse_args()

        # False lookup
        false_array = ['False', 'false', '0', False]

        # Get alert details from database by ip
        io_document = db['io-modules'].find_one({'parent': parent})
        if io_document == None:
            return(404)


        ip = io_document['ip']
        c = ModbusClient(host=ip, port=502, auto_open=True, timeout=1)
        
        outputs = [args['0'], args['1'], args['2'], args['3'], args['4'], args['5']]

        for index, output in enumerate(outputs):
            if output in false_array:
                outputs[index] = ''

        try:
            # Set output states via modbus
            c.write_single_coil(16, outputs[0])
            c.write_single_coil(17, outputs[1])
            c.write_single_coil(18, outputs[2])
            c.write_single_coil(19, outputs[3])
            c.write_single_coil(20, outputs[4])
            c.write_single_coil(21, outputs[5])

            # Read the outputs again
            bits = c.read_coils(16, 6)
        
        except: 
            return(404)
        
        return(bits)


# Map URL's to resource classes
api.add_resource(io_all, "/io")
api.add_resource(io_detail, "/io/<string:parent>")

# Run flask
app.run(debug=True, host='0.0.0.0')