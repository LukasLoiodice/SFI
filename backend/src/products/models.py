from src.models import Base
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from dataclasses import dataclass

@dataclass
class ProductModel(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(), nullable=False)
    description: Mapped[str] = mapped_column(String(), nullable=False)
    photo_uri: Mapped[str] = mapped_column(String(), nullable=False)
