from typing import Annotated
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from src.users import schemas as user_schemas
from sqlalchemy.orm import Session
from src.users import models as user_models
from src.config import config
from src.auth.schemas import *
from src.dependencies import get_db, oauth2_scheme
import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(
    tags=["auth"],
)

secret_key: str
with open(config.auth.JWT_SECRET_PATH) as f:
    secret_key = f.read().strip()

@router.post("/login")
async def login(
    db: Annotated[get_db, Depends()],
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    Login using username and password.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token_expires = timedelta(minutes=config.auth.JWT_EXP)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")

@router.get("/whoami")
async def whoami(
    token: Annotated[str, Depends(oauth2_scheme)]
) -> str:
    pass


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str):
    return pwd_context.hash(password)

def authenticate_user(db: Session, username: str, password: str) -> user_schemas.User | None :
    user = db.query(user_models.User).filter(user_models.User.email == username).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=config.auth.JWT_ALG)
    return encoded_jwt