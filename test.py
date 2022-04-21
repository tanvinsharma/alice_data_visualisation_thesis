import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

with open('/Users/tanvinsharma/Desktop/cern thesis/tracks/tracks1647477806262.json') as file:
	db = json.load(file)

fig = plt.figure(figsize=(10,10))
ax = fig.add_subplot(111, projection='3d')
x_values = {}
y_values = {}
z_values = {}
c = 0
charge = []
for track in db['mTracks']:
	x = []
	y = []
	z = []
	for element in track['mClusters']:
		x.append(element['X'])
		y.append(element['Y'])
		z.append(element['Z'])
	x_values[c] = x
	y_values[c] = y
	z_values[c] = z
	charge.append((c, track['charge']))
	c += 1

no_of_red = 0
no_of_blue = 0
no_of_black = 0
for i in range(c):
	for a_tuple in charge:
		if i == a_tuple[0]:
			charge_value = a_tuple[1]
		if charge_value == 0:
			no_of_black+=1
		if charge_value == 1:
			no_of_blue+=1
		if charge_value == -1:
			no_of_red+=1

	if charge_value == 1:
		ax.plot(x_values[i], y_values[i], z_values[i], 'b')
	if charge_value == -1:
		ax.plot(x_values[i], y_values[i], z_values[i], 'r')
	# if charge_value == 0:
	# 	no_of_black+=1
	# 	ax.plot(x_values[i], y_values[i], z_values[i], 'k')
# print(no_of_red)
# print(no_of_blue)
# print(no_of_black)
# uncomment to see plot
plt.show()

