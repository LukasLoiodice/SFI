from sqlalchemy.orm import Session

from src.database import sessionLocal
from fastapi.security import OAuth2PasswordBearer

def get_db() -> Session:
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")