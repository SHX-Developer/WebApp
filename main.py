from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from database import init_db
from app.routes.clicker import router as clicker_router

app = FastAPI()

@app.on_event("startup")
def startup_event():
    init_db()

# ✅ СНАЧАЛА подключаем API
app.include_router(clicker_router)

# ✅ ПОТОМ монтируем React SPA
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")

# необязательно — но можно оставить для ручного доступа
@app.get("/")
async def serve_react():
    return FileResponse("frontend/dist/index.html")
