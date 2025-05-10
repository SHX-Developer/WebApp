from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="app/templates")
router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def get_main(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@router.post("/click")
async def receive_click():
    return {"status": "ok"}
