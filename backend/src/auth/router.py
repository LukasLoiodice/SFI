from typing import Annotated
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from src.users import schemas as user_schemas
from src.users import models as user_models
from src.config import config
from src.auth.schemas import *
from src.dependencies import get_db, get_current_user
from src.auth.service import *
from src.users import service as user_service

router = APIRouter(
    tags=["auth"],
)

@router.post("/login")
async def login(
    db: Annotated[get_db, Depends()],
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    Login using email and password.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    access_token_expires = timedelta(minutes=config.auth.JWT_EXP)
    access_token = create_access_token(data={"sub": str(user.id)}, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")

@router.get("/whoami")
async def whoami(
    user_id: Annotated[get_current_user, Depends()]
) -> str:
    return user_id

@router.post('/register')
async def login(
    db: Annotated[get_db, Depends()],
    req: RegisterRequest
) -> RegisterResponse:
    """
    Create an account.
    """
    user_model = user_models.UserModel(
        password_hash=get_password_hash(req.password),
        email=req.email,
        first_name=req.first_name,
        last_name=req.last_name
    )

    user_model = user_service.create_user(db, user_model)

    res = RegisterResponse(
        user=user_schemas.User(
            id=user_model.id,
            email=user_model.email,
            first_name=user_model.first_name,
            last_name=user_model.last_name
        )
    )

    return res