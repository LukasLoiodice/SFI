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