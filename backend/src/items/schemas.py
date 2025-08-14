from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime

ItemStatus = Literal["unknown", "valid", "invalid"]

class Item(BaseModel):
    id: int
    product_id: int
    status: ItemStatus = Field(default="unknown")
    created_by: int
    updated_by: int
    created_at: datetime
    updated_at: datetime

class AddItemResponse(BaseModel):
    item: Item

class ListItemsResponse(BaseModel):
    items: list[Item]