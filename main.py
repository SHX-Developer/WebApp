from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from database import init_db
from app.routes.clicker import router as clicker_router

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_db()

# подключаем React сборку
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")

# маршруты API
app.include_router(clicker_router)

# если хотим вручную отдавать index.html
@app.get("/")
async def serve_react():
    return FileResponse("frontend/dist/index.html")
