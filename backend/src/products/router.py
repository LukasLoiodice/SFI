from fastapi import APIRouter, Depends
from typing import Annotated
from src.auth import service as auth_service
from src.dependencies import get_token, get_operator_token, get_db
from sqlalchemy.ext.asyncio import AsyncSession
from src.products.schemas import *
from src.products.service import *

router = APIRouter(
    tags=["products"],
    prefix="/products"
)

@router.post('/')
async def add_product(
    _: Annotated[auth_service.TokenData, Depends(get_operator_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    req: AddProductRequest
) -> AddProductResponse:
    db_product = ProductModel(
        name=req.name,
        description=req.description,
        photo_uri=req.photo_uri
    )

    db_product = await db_add_product(db, db_product)

    product = Product(
        id=db_product.id,
        name=db_product.name,
        decription=db_product.description,
        photo_uri=db_product.photo_uri
    )

    return AddProductResponse(
        product=product
    )

@router.get('/')
async def list_products(
    _: Annotated[auth_service.TokenData, Depends(get_token)],
    db: Annotated[AsyncSession, Depends(get_db)]
) -> ListProductsResponse:
    db_products = await db_list_products(db)
    
    # Convert to schema
    products: list[Product] = []
    for db_product in db_products:
        products.append(Product(
            id=db_product.id,
            name=db_product.name,
            decription=db_product.description,
            photo_uri=db_product.photo_uri
        ))
    
    return ListProductsResponse(
        products=products
    )

@router.get('/{:product_id}')
async def get_product(
    _: Annotated[auth_service.TokenData, Depends(get_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    product_id: int
) -> GetProductResponse:
    db_product = await db_get_product(db, product_id)

    # Convert to schema
    product = Product(
        id=db_product.id,
        name=db_product.name,
        decription=db_product.description,
        photo_uri=db_product.photo_uri
    )

    return GetProductResponse(
        product=product
    )

@router.put('/{:product_id}')
async def edit_product(
    _: Annotated[auth_service.TokenData, Depends(get_operator_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    product_id: int,
    req: EditProductRequest
) -> None:
    print(req.description)
    await db_put_product(db, product_id, req.name, req.description, req.photo_uri)
    return

@router.delete('/{:product_id}')
async def delete_product(
    _: Annotated[auth_service.TokenData, Depends(get_operator_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    product_id: int,    
) -> None:
    await db_delete_product(db, product_id)
    return