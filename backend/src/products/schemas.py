from pydantic import BaseModel

class Product(BaseModel):
    id: int
    name: str
    description: str = ''
    photo_uri: str = ''

class ListProductsResponse(BaseModel):
    products: list[Product]

class GetProductResponse(BaseModel):
    product: Product

class AddProductRequest(BaseModel):
    name: str
    description: str = ''
    photo_uri: str = ''

class AddProductResponse(BaseModel):
    product: Product

class EditProductRequest(BaseModel):
    name: str
    description: str = ''
    photo_uri: str = ''