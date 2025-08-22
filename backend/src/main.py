from typing import Union
from fastapi import FastAPI
from src.auth.router import router as auth_router
from src.users.router import router as users_router
from src.products.router import router as products_router
from src.items.router import router as items_router
from src.database import *
from src.users.models import *
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.mongo import *

@asynccontextmanager
async def startup_event(app: FastAPI):
    await init_admin()
    try:
        yield
    finally:
        await mongo_manager.close()
        await session_manager.close()

# Init fastapi
app = FastAPI(lifespan=startup_event)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(products_router)
app.include_router(items_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running. Visit /docs for API documentation."}
