from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import webapp

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.include_router(webapp.router)

import logging
logging.basicConfig(level=logging.DEBUG)
