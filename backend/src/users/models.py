from src.database import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(), nullable=False)
    first_name: Mapped[str] = mapped_column(String(), nullable=False)
    last_name: Mapped[str] = mapped_column(String(), nullable=False)

