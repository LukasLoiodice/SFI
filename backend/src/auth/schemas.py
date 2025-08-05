from pydantic import BaseModel
from src.users import schemas as user_schemas

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

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