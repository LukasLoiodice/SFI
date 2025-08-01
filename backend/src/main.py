from typing import Union
from fastapi import FastAPI
from src.auth.router import router as auth_router
from src.database import *
from src.users.models import *

app = FastAPI()
app.include_router(auth_router)

Base.metadata.create_all(engine)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}