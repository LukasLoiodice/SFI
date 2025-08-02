from pydantic import BaseModel
from src.users import schemas as user_schemas

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

class RegisterRequest(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str  # mot de passe brut

class RegisterResponse(BaseModel):
    user: user_schemas.User