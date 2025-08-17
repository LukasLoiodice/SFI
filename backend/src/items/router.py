from fastapi import APIRouter, Depends, UploadFile, Body, status
from fastapi.responses import StreamingResponse
from typing import Annotated
from src.dependencies import get_operator_token, get_db, get_mongo, get_token, get_inspector_token
from src.auth import service as auth_service
from sqlalchemy.ext.asyncio import AsyncSession
from src.items.schemas import *
from src.items.service import *
from pymongo.asynchronous.database import AsyncDatabase
import io

router = APIRouter(
    tags=["items"],
    prefix="/items"
)

@router.post('/')
async def add_item(
    token: Annotated[auth_service.TokenData, Depends(get_operator_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    mongo: Annotated[AsyncDatabase, Depends(get_mongo)],
    product_id: Annotated[int, Body()],
    file: UploadFile
) -> AddItemResponse:
    # Ensure the file is a glb file with the magic number https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/Specification.adoc#44-binary-gltf-layout
    header = await file.read(4)
    await file.seek(0)
    if header != b'glTF':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="invalid glb file")

    # Read content
    content = await file.read()

    # Put in db
    db_item = await db_add_item(db, token.user_id, product_id)

    # Create mongo document
    mongo_doc = {}
    mongo_doc["_id"] = db_item.id
    mongo_doc["filename"] = file.filename
    mongo_doc["content_type"] = file.content_type
    mongo_doc["uploaded_by"] = token.user_id
    mongo_doc["uploaded_at"] = datetime.now()
    mongo_doc["data"] = content

    # Put to mongo
    await mongo.files.insert_one(mongo_doc)

    return AddItemResponse(
        id=db_item.id
    )

@router.get('/')
async def list_items(
    _: Annotated[auth_service.TokenData, Depends(get_token)],
    db: Annotated[AsyncSession, Depends(get_db)]
) -> ListItemsResponse:
    db_items = await db_list_items(db)

    items: list[Item] = []
    for db_item, db_product in db_items:
        items.append(Item(
            id=db_item.id,
            product_name=db_product.name,
            status=db_item.status,
            created_by=db_item.created_by,
            updated_by=db_item.updated_by,
            created_at=db_item.created_at,
            updated_at=db_item.updated_at
        ))

    return ListItemsResponse(
        items=items
    )

@router.get('/{item_id}')
async def get_item_content(
    _: Annotated[auth_service.TokenData, Depends(get_token)],
    mongo: Annotated[AsyncDatabase, Depends(get_mongo)],
    item_id: int
):
    file = await mongo.files.find_one({"_id": item_id})
    if file == None:
        raise item_not_found_exception
    return StreamingResponse(io.BytesIO(file["data"]), media_type=file["content_type"])

@router.put('/{item_id}')
async def update_item_status(
    token: Annotated[auth_service.TokenData, Depends(get_inspector_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    item_id: int,
    req: UpdateItemStatusRequest,
):
    await db_update_item_status(db, item_id, token.user_id, req.status)
    return

@router.delete('/{item_id}')
async def delete_item(
    _: Annotated[auth_service.TokenData, Depends(get_operator_token)],
    db: Annotated[AsyncSession, Depends(get_db)],
    mongo: Annotated[AsyncDatabase, Depends(get_mongo)],
    item_id: int
):
    await db_delete_item(db, item_id)
    await mongo.files.delete_one({"_id": item_id})
    return