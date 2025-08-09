from sqlalchemy.ext.asyncio import AsyncSession
from src.products.models import *
from sqlalchemy import select
from fastapi import HTTPException, status

product_not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Product not found"
)

async def db_add_product(db: AsyncSession, product: ProductModel) -> ProductModel:
    db.add(product)
    await db.commit()
    await db.refresh(product)
    return product


async def db_list_products(db: AsyncSession) -> list[ProductModel]:
    db_products = (await db.scalars(select(ProductModel))).all()
    return db_products

async def db_get_product(db: AsyncSession, id: int) -> ProductModel:
    db_product = await db.scalar(select(ProductModel).where(ProductModel.id == id))

    if not db_product:
        raise product_not_found_exception

    return db_product

async def db_put_product(db: AsyncSession, id: int, name: str, description: str, photo_uri: str) -> None:
    product = await db.scalar(select(ProductModel).where(ProductModel.id == id))

    if not product:
        raise product_not_found_exception
    
    product.name = name
    product.description = description
    product.photo_uri = photo_uri

    await db.commit()

async def db_delete_product(db: AsyncSession, id: int) -> None:
    product = await db.scalar(select(ProductModel).where(ProductModel.id == id))

    if not product:
        raise product_not_found_exception
    
    await db.delete(product)
    await db.commit()
