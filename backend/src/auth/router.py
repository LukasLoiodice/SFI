from typing import Annotated
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from src.users import schemas as user_schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str):
    return pwd_context.hash(password)

def authenticate_user(username: str, password: str) -> user_schemas.User | None :
    pass

router = APIRouter(
    tags=["auth"],
)

@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """
    Login using username and password.
    """
    user = authenticate_user(form_data.username, form_data.password)