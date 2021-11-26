import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from pythreejs import *
from IPython.display import display
from ipywidgets import VBox, HBox, Checkbox, jslink
from pythreejs._example_helper import use_example_model_ids
use_example_model_ids()

with open('/Users/tanvinsharma/Desktop/cern thesis/tracks1635345855523.json') as file:
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


for i in range(c):
	for a_tuple in charge:
		if i == a_tuple[0]:
			charge_value = a_tuple[1]
	if charge_value == 1:
		ax.plot(x_values[i], y_values[i], z_values[i], 'b')
	if charge_value == -1:
		ax.plot(x_values[i], y_values[i], z_values[i], 'r')
	if charge_value == 0:
		ax.plot(x_values[i], y_values[i], z_values[i], 'k')

# uncomment to see plot
# plt.show()


size = 4
linesgeom = Geometry(vertices=[[0, 0, 0],
                                    [size, 0, 0],
                                    [0, 0, 0],
                                    [0, size, 0],
                                    [0, 0, 0],
                                    [0, 0, size]],
                          colors = ['red', 'red', 'green', 'green', 'white', 'orange'])
lines = Line(geometry=linesgeom, 
             material=LineBasicMaterial(linewidth=5, vertexColors='VertexColors'), 
             type='LinePieces',
            )
scene = Scene(children=[
    lines,
    DirectionalLight(color='#ccaabb', position=[0,10,0]),
    AmbientLight(color='#cccccc'),
    ])
c = PerspectiveCamera(position=[10, 10, 10])
renderer = Renderer(camera=c, background='black', background_opacity=1, scene=scene, controls=[OrbitControls(controlling=c)],
                    width=400, height=400)
display(renderer)
