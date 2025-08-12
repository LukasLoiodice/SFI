from pymongo import AsyncMongoClient
from src.config import config

# Read the passwords secrets
mongo_password: str
with open(config.mongo.MG_PASSWORD_PATH) as f:
    mongo_password = f.read().strip()

async def test():
    mongo_client = AsyncMongoClient(config.mongo.MG_HOST,
                                    port=config.mongo.MG_PORT,
                                    username=config.mongo.MG_USERNAME,
                                    password=mongo_password,
                                    authSource='admin')

    posts = mongo_client.mongo.posts

    await posts.insert_one({
        "author": "Mike",
        "text": "My first blog post!",
        "tags": ["mongodb", "python", "pymongo"],
        "date": "test"
    })