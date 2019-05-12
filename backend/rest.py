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
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize mongo
client = pymongo.MongoClient('mongodb://10.1.1.103:27017/')
db = client['super-octo-system']


class modules(Resource):
    def get(self):
        # Get all sign data from the signs collection in mongo
        io = db['modules'].find().sort("parent",pymongo.ASCENDING)

        # Return collection as a massive json
        return(jsonify(json.loads(dumps(io))))


class outputs(Resource):

    def get(self):
        # Get all sign data from the signs collection in mongo
        io = db['outputs'].find().sort("parent",pymongo.ASCENDING)

        # Return collection as a massive json
        return(jsonify(json.loads(dumps(io))))

    def post(self):

        # Blank output array
        outputs = []

        # Parse the form data
        parser = reqparse.RequestParser()
        parser.add_argument('module')
        parser.add_argument('output')
        parser.add_argument('state')

        args = parser.parse_args()

        # False lookup
        false_array = ['False', 'false', '0', False, None]

        if args['state'] in false_array:
            state = False
        else:
            state = True

        print("Module: {} | Output: {} | Set: {}".format(args['module'], args['output'], state))

        db['outputs'].find_one_and_update(
            {
                'parent' : args['module'],
                'output' : int(args['output'])
            },
            {
                '$set': 
                {
                'set' : state
                }
            },
            upsert = False
        )
        return(201)






# Map URL's to resource classes
api.add_resource(modules, "/modules")
api.add_resource(outputs, "/outputs")

# Run flask
app.run(debug=True, host='0.0.0.0')