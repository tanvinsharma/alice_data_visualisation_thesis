import json

with open('/Users/tanvinsharma/Desktop/cern thesis/tracks1635345855523.json') as file:
	db = json.load(file)

db['mTracks'].sort(key=lambda x: x['time'])