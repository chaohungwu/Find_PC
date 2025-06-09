from fastapi import *
from fastapi.responses import FileResponse
from router.router import router
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]



app = FastAPI()


app.include_router(router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def index(request: Request):
	return FileResponse("./static/index.html", media_type="text/html")

app.mount("/static", StaticFiles(directory="static"))#所有靜態文件資料夾

