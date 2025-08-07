from sqlalchemy.orm import Session
from src.config import config
from src.database import sessionLocal
from src.auth.service import decode_access_token
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from src.auth.schemas import TokenData

secret_key: str
with open(config.auth.JWT_SECRET_PATH) as f:
    secret_key = f.read().strip()

def get_db() -> Session:
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

async def get_token(
        token: Annotated[str, Depends(oauth2_scheme)]
) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )

    data = decode_access_token(token)
    if data is None:
        raise credentials_exception

    return data

async def get_admin_token(
        data: Annotated[TokenData, Depends(get_token)]
) -> TokenData:
    admin_permission_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Must be admin to call this API"
    )

    if data.user_role != "admin":
        raise admin_permission_exception
    
    return data