import jwt
from src.config import config
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from src.users import models as user_models
from src.users import schemas as user_schemas
from src.auth.schemas import *
from sqlalchemy import select

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

secret_key: str
with open(config.auth.JWT_SECRET_PATH) as f:
    secret_key = f.read().strip()



def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=config.auth.JWT_ALG)
    return encoded_jwt

def decode_access_token(token: str) -> TokenData:
    payload = jwt.decode(token, secret_key, algorithms=[config.auth.JWT_ALG])

    id = int(payload.get("sub"))
    role = payload.get("role")
    expiration_ts = payload.get("exp")
    expiration = datetime.fromtimestamp(expiration_ts, tz=timezone.utc)

    return TokenData(
        user_id=id,
        user_role=role,
        expiration=expiration
    )


async def db_authenticate_user(db: AsyncSession, email: str, password: str) -> user_schemas.User | None :
    user = (await db.scalars(select(user_models.UserModel).where(user_models.UserModel.email == email))).first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user
