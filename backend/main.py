from fastapi import FastAPI
from routes.user_routes import router
from fastapi.middleware.cors import CORSMiddleware
import webbrowser
from routes.auth_routes import router as auth_router



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)


@app.on_event("startup")
def open_swagger():
    webbrowser.open("http://127.0.0.1:8000/docs")