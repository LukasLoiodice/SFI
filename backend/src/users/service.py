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

def put_user(db: Session, id: int, email: str, first_name: str, last_name: str) -> None:
    db.query(UserModel).filter(UserModel.id == id).update({UserModel.email: email, UserModel.first_name: first_name, UserModel.last_name: last_name})
    db.commit()
    return

def delete_user(db: Session, id: int) -> None:
    db.query(UserModel).filter(UserModel.id == id).delete()
    db.commit()
    return