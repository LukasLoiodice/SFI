from sqlalchemy.orm import Session
from src.users.models import *

def create_user(db: Session, user: UserModel) -> UserModel:
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user(db: Session, user_id: int) -> UserModel:
    user = db.get(UserModel, user_id)
    db.commit()
    return user

def put_user(db: Session, id: int, first_name: str, last_name: str, role: str | None = None) -> None:
    update_data = {
        UserModel.first_name: first_name,
        UserModel.last_name: last_name
    }

    if role:
        update_data[UserModel.role] = role

    db.query(UserModel).filter(UserModel.id == id).update(update_data)
    db.commit()
    return

def delete_user(db: Session, id: int) -> None:
    db.query(UserModel).filter(UserModel.id == id).delete()
    db.commit()
    return

def list_user(db: Session) -> list[UserModel]:
    users = db.query(UserModel).all()
    db.commit()
    return users