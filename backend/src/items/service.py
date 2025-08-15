from sqlalchemy.ext.asyncio import AsyncSession
from src.items.models import *
from src.items.schemas import *
from src.products.models import ProductModel
from sqlalchemy import select
from fastapi import HTTPException, status
from typing import Tuple

item_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Item not found"
)

async def db_add_item(db: AsyncSession, user_id: int, product_id: int) -> ItemModel:
    item = ItemModel(
        product_id=product_id,
        created_by=user_id,
        updated_by=user_id
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item

async def db_list_items(db: AsyncSession) -> list[Tuple[ItemModel, ProductModel]]:
    db_items = (await db.execute(select(ItemModel, ProductModel).join(ProductModel, ItemModel.product_id == ProductModel.id))).all()
    return db_items

async def db_update_item_status(db: AsyncSession, id: int, user_id: int, status: ItemStatus):
    db_item = await db.scalar(select(ItemModel).where(ItemModel.id == id))

    if not db_item:
        raise item_not_found_exception

    db_item.updated_by = user_id
    db_item.status = status

    await db.commit()

async def db_delete_item(db: AsyncSession, id: int):
    db_item = await db.scalar(select(ItemModel).where(ItemModel.id == id))

    if not db_item:
        raise item_not_found_exception
    
    await db.delete(db_item)
    await db.commit()