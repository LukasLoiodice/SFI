from pydantic import BaseModel, Field
from typing import Literal

Role = Literal["user", "operator", "inspector", "admin"]

class User(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    role: Role = Field(default="user")

class GetAllUsersResponse(BaseModel):
    users: list[User]

class GetUserResponse(BaseModel):
    user: User

class UpdateUserRequest(BaseModel):
    first_name: str
    last_name: str
    role: Role