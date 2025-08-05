from sqlalchemy.orm import Session
from src.config import config
from src.database import sessionLocal
from src.auth.service import decode_access_token
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

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

async def get_current_user_id(
        token: Annotated[str, Depends(oauth2_scheme)]
    ) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )

    id = decode_access_token(token)
    if id is None:
        raise credentials_exception

    return id