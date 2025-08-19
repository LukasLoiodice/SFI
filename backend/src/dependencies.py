from src.config import config
from src.database import session_manager
from src.auth.service import decode_access_token, decode_refresh_token
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from src.auth.schemas import TokenData, RefreshTokenData
from typing import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession
from src.mongo import mongo_manager
from pymongo.asynchronous.database import AsyncDatabase

secret_key: str
with open(config.auth.JWT_SECRET_PATH) as f:
    secret_key = f.read().strip()

async def get_db() -> AsyncIterator[AsyncSession]:
    async with session_manager.session() as session:
        yield session

async def get_mongo() -> AsyncDatabase:
    return mongo_manager.get_db()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login", refreshUrl="refresh")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials"
)

async def get_token(
        token: Annotated[str, Depends(oauth2_scheme)]
) -> TokenData:
    data = decode_access_token(token)
    if data is None:
        raise credentials_exception

    if data.type != "access":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid access token"
        )
    
    return data

async def get_refresh_token(
        token: Annotated[str, Depends(oauth2_scheme)]
) -> RefreshTokenData:
    data = decode_refresh_token(token)
    if data is None:
        raise credentials_exception
    
    if data.type != "refresh":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid refresh token"
        )
    
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

async def get_operator_token(
        data: Annotated[TokenData, Depends(get_token)]
) -> TokenData:
    operator_permission_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Must be at least operator to call this API"
    )

    if data.user_role != "admin" and data.user_role != "operator":
        raise operator_permission_exception
    
    return data

async def get_inspector_token(
        data: Annotated[TokenData, Depends(get_token)]
) -> TokenData:
    inspector_permission_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Must be at least inspector to call this API"
    )

    if data.user_role != "admin" and data.user_role != "inspector":
        raise inspector_permission_exception
    
    return data