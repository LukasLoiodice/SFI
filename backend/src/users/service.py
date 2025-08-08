from sqlalchemy.ext.asyncio import AsyncSession
from src.users.models import *
from sqlalchemy import select
from fastapi import HTTPException, status

user_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="User not found"
)

async def db_create_user(db: AsyncSession, user: UserModel) -> UserModel:
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def db_get_user(db: AsyncSession, user_id: int) -> UserModel:
    user = await db.get(UserModel, user_id)

    if not user:
        raise user_not_found_exception

    return user

async def db_put_user(db: AsyncSession, id: int, first_name: str, last_name: str, role: str | None = None) -> None:
    user = (await db.scalars(select(UserModel).where(UserModel.id == id))).first()

    if not user:
        raise user_not_found_exception

    user.first_name = first_name
    user.last_name = last_name
    if role:
        user.role = role

    await db.commit()

async def db_delete_user(db: AsyncSession, id: int) -> None:
    user = (await db.scalars(select(UserModel).where(UserModel.id == id))).first()

    if not user:
        raise user_not_found_exception
    
    await db.delete(user)
    await db.commit()

    return

async def db_list_user(db: AsyncSession) -> list[UserModel]:
    users = (await db.scalars(select(UserModel))).all()
    return users