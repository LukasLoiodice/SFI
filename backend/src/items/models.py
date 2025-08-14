from src.models import Base
from sqlalchemy import String, ForeignKey, DateTime, Integer, func
from sqlalchemy.orm import Mapped, mapped_column
from dataclasses import dataclass
from datetime import datetime

@dataclass
class ItemModel(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(Integer(), ForeignKey("products.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(), nullable=False, default="unknown")
    created_by: Mapped[int] = mapped_column(Integer(), ForeignKey("users.id"), nullable=False)
    updated_by: Mapped[int] = mapped_column(Integer(), ForeignKey("users.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )
