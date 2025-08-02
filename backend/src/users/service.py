from sqlalchemy.orm import Session
from src.users.models import *

def create_user(db: Session, user: UserModel) -> UserModel:
    db.add(user)
    db.commit()
    db.refresh(user)
    return user