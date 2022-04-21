#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from IPython.core.display import HTML
HTML("<script>Jupyter.notebook.kernel.restart()</script>")


# In[1]:


import numpy as np
from pythreejs import *
from IPython.display import display
from ipywidgets import VBox, HBox, Checkbox, jslink
# from pythreejs._example_helper import use_example_model_ids
# use_example_model_ids()

import ipywidgets as widgets
import ipyvolume as ipv
import os

from ipywidgets import IntSlider
from ipywidgets.embed import embed_minimal_html


# In[2]:


# Incase of a docker pulled image, uncomment this and comment the other open
# with open('/src/tracks1635345855523.json') as file:
# 	db = json.load(file)

# with open('/Users/tanvinsharma/Desktop/cern thesis/tracks1635345855523.json') as file:
# 	db = json.load(file)

# In[3]:

def make_tracks(db: dict):
    x_values = {}
    y_values = {}
    z_values = {}
    c = 0
    charge = []
    tracks = {}
    try:
        db['mTracks'].sort(key=lambda x: x['time'])
    except Exception as e:
        print(e)
    for track in db['mTracks']:
        all_points = []
        for element in track['mClusters']:
            point = (element['X'], element['Y'], element['Z'])
            all_points.append(point)
        tracks[c] = all_points
        charge.append((c, track['charge']))
        c+=1

    for key, value in tracks.items():
        tracks[key] = [list(ele) for ele in value]
    final = []

    charge_color = {
        0: '#000000',
        -1: '#0000FF',
        1: '#FF0000'
    }

    for i in range(c):
        for a_tuple in charge:
            if i == a_tuple[0]:
                charge_value = a_tuple[1]
        if charge_value == 0:
            continue

        linesgeom = Geometry(vertices=tracks[i])
        line = Line(geometry=linesgeom, 
             material=LineBasicMaterial(linewidth=5, color=charge_color[charge_value], linejoin='round'), 
             type='LineBasicMaterial',
            )
        final.append(line) 
        
    linez = Group(children=final, visible=True)
    scene = Scene(children=[
        linez,
        DirectionalLight(color='#ccaabb', position=[0,0,0]),
        AmbientLight(color='#cccccc'),
        ])
    c = PerspectiveCamera(position=[10, 10, 10])
    renderer = Renderer(camera=c, background='black', background_opacity=1, scene=scene, controls=[OrbitControls(controlling=c)],
                        width=700, height=700)

    embed_minimal_html('templates/export.html', views=[renderer], title='Tracks projection')
# display(renderer)


# In[4]:


from ipywidgets import IntSlider
from ipywidgets.embed import embed_minimal_html

slider = IntSlider(value=40)
# embed_minimal_html('export.html', views=[slider, renderer], title='Widgets export')

