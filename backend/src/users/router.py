from fastapi import APIRouter, Depends
from typing import Annotated
from src.auth import service as auth_service
from src.dependencies import get_admin_token, get_db
from src.users.service import *
from src.users.schemas import *

router = APIRouter(
    tags=["users"],
    prefix="/users"
)

@router.get('/')
async def get_all_users(
    _: Annotated[auth_service.TokenData, Depends(get_admin_token)],
    db: Annotated[Session, Depends(get_db)],
) -> GetAllUsersResponse:
    db_users = list_user(db)

    # Convert to schema
    users: list[User] = []
    for db_user in db_users:
        users.append(User(
            id=db_user.id,
            email=db_user.email,
            first_name=db_user.first_name,
            last_name=db_user.last_name,
            role=db_user.role
        ))

    return GetAllUsersResponse(
        users=users
    )

@router.put("/{user_id}")
async def update_user(
    _: Annotated[auth_service.TokenData, Depends(get_admin_token)],
    db: Annotated[Session, Depends(get_db)],
    user_id: int,
    req: UpdateUserRequest
) -> None:
    put_user(db, user_id, req.first_name, req.last_name, req.role)
    return