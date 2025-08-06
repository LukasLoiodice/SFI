from src.models import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from dataclasses import dataclass
from src.users.schemas import Role

@dataclass
class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    password_hash: Mapped[str] = mapped_column(String(), nullable=False)
    email: Mapped[str] = mapped_column(String(), nullable=False, unique=True)
    first_name: Mapped[str] = mapped_column(String(), nullable=False)
    last_name: Mapped[str] = mapped_column(String(), nullable=False)
    role: Mapped[Role] = mapped_column(String(), nullable=False, default="user")
