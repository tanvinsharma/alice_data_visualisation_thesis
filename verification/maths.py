import numpy as np
import matplotlib.pyplot as plt 
from mpl_toolkits import mplot3d
import random
import json

ax = plt.axes(projection= '3d')


charge = {
	'pos': 1,
	'neg': -1,
	'neu': 0
}
data = {'mTracks': []}

def createTracks():
	t = np.linspace(- 2*np.pi, 2*np.pi, 1000)
	r = random.uniform(1, 10)
	# x = t - (1.6 * np.cos(24*t))
	# y = t - (1.6 * np.sin(25*t))
	# z = x*y*100
	c = random.uniform(1, 10)
	x = r * np.cos(t)
	y = r * np.sin(t)
	z = c * t


# mTracks and mClusters is list of dict
	mClusters = []
	# print(charge[random.choice(list(charge))])
	no_of_tracks = len(x)
	for i in range(no_of_tracks):
		mClusters.append({"X": x[i], "Y": y[i], "Z": z[i]}) 

	data['mTracks'].append({'charge': charge[random.choice(list(charge))], 'mClusters': mClusters})

for i in range(100):
	createTracks();


json_object = json.dumps(data)

with open("verify.json", "w") as outfile:
	outfile.write(json_object)

