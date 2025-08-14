from pymongo import AsyncMongoClient
from src.config import config

# Read the passwords secrets
mongo_password: str
with open(config.mongo.MG_PASSWORD_PATH) as f:
    mongo_password = f.read().strip()

class MongoManager():
    def __init__(self, host: str, port: str, username: str, password: str, authSource: str):
        self._mongo_client = AsyncMongoClient(host,
                                port=port,
                                username=username,
                                password=password,
                                authSource=authSource)
        
    async def close(self):
        await self._mongo_client.close()

mongo_manager = MongoManager(config.mongo.MG_HOST,
                                port=config.mongo.MG_PORT,
                                username=config.mongo.MG_USERNAME,
                                password=mongo_password,
                                authSource='admin')

# def setup_mongo() -> AsyncMongoClient:
#     mongo_client = AsyncMongoClient(config.mongo.MG_HOST,
#                                     port=config.mongo.MG_PORT,
#                                     username=config.mongo.MG_USERNAME,
#                                     password=mongo_password,
#                                     authSource='admin')
    
#     return mongo_client

#     # posts = mongo_client.mongo.posts

#     # await posts.insert_one({
#     #     "author": "Mike",
#     #     "text": "My first blog post!",
#     #     "tags": ["mongodb", "python", "pymongo"],
#     #     "date": "test"
#     # })