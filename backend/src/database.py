from sqlalchemy import URL, create_engine
from sqlalchemy.orm import DeclarativeBase
from src.config import config

class Base(DeclarativeBase):
    pass

# Read the password secret
db_password: str
with open(config.database.DB_PASSWORD_PATH) as f:
    db_password = f.read().strip()

url = URL.create(
    "postgresql+psycopg2",
    username=config.database.DB_USERNAME,
    password=db_password,
    host=config.database.DB_HOST,
    port=config.database.DB_PORT,
    database=config.database.DB_NAME
)

engine = create_engine(url, echo=True)