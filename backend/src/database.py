from sqlalchemy import URL, create_engine
from sqlalchemy.orm import sessionmaker, Session
from src.config import config
from src.models import Base
from src.users.models import *

# Read the passwords secrets
db_password: str
with open(config.database.DB_PASSWORD_PATH) as f:
    db_password = f.read().strip()

admin_password_hash: str
with open(config.admin.ADMIN_PASSWORD_HASH_PATH) as f:
    admin_password_hash = f.read().strip()

url = URL.create(
    "postgresql+psycopg2",
    username=config.database.DB_USERNAME,
    password=db_password,
    host=config.database.DB_HOST,
    port=config.database.DB_PORT,
    database=config.database.DB_NAME
)

engine = create_engine(url, echo=True)

# Create new tables
Base.metadata.create_all(engine)

sessionLocal = sessionmaker(bind=engine)

# # Add default user
db: Session = sessionLocal()
existing_admin = db.query(UserModel).filter(UserModel.email == config.admin.ADMIN_EMAIL).first()
if not existing_admin:
    admin = UserModel(
        email=config.admin.ADMIN_EMAIL,
        password_hash=admin_password_hash,
        first_name=config.admin.ADMIN_FIRST_NAME,
        last_name=config.admin.ADMIN_LAST_NAME,
        role="admin"
    )
    db.add(admin)
    db.commit()
db.close()