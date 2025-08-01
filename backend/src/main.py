from typing import Union
from fastapi import FastAPI
from src.auth.router import router as auth_router
from src.database import *
from src.users.models import *

# Init fastapi
app = FastAPI()
app.include_router(auth_router)