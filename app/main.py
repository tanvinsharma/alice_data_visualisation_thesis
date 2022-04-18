import json
from IPython.core.display import HTML
HTML("<script>Jupyter.notebook.kernel.restart()</script>")
import numpy as np
from pythreejs import *
from IPython.display import display
from ipywidgets import VBox, HBox, Checkbox, jslink
from pythreejs._example_helper import use_example_model_ids
use_example_model_ids()

import ipywidgets as widgets
import ipyvolume as ipv
import os

from ipywidgets import IntSlider
from ipywidgets.embed import embed_minimal_html
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.responses import StreamingResponse, Response

from notebook import make_tracks
app = FastAPI()

templates = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
async def test(request: Request):
	return templates.TemplateResponse("start.html", {"request": request})

@app.post('/uploadfile/')
async def create_upload_file(file: UploadFile, request: Request):
	contents = await file.read()
	json_contents = json.loads(contents)
	make_tracks(json_contents)
	return templates.TemplateResponse("export.html", {"request": request})
	# return Response(content=contents, media_type="application/json")
	