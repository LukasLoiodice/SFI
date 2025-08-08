from pydantic import BaseModel
from src.users import schemas as user_schemas
from src.users.schemas import Role
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: int
    user_role: Role
    expiration: datetime

class LoginResponse(BaseModel):
    user: user_schemas.User
    token: Token

class RegisterRequest(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str

class RegisterResponse(BaseModel):
    user: user_schemas.User

class PutCurrentUserRequest(BaseModel):
    first_name: str
    last_name: str