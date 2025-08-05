from typing import Union
from fastapi import FastAPI
from src.auth.router import router as auth_router
from src.database import *
from src.users.models import *
from fastapi.middleware.cors import CORSMiddleware

# Init fastapi
app = FastAPI()
app.include_router(auth_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)