from sqlalchemy import URL, select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncConnection, AsyncSession
from src.config import config
from src.models import *
from src.users.models import *
from typing import Any, AsyncIterator
from contextlib import asynccontextmanager

# Read the passwords secrets
db_password: str
with open(config.database.DB_PASSWORD_PATH) as f:
    db_password = f.read().strip()

admin_password_hash: str
with open(config.admin.ADMIN_PASSWORD_HASH_PATH) as f:
    admin_password_hash = f.read().strip()

class DatabaseSessionManager:
    def __init__(self, host: URL, engine_kwargs: dict[str, Any] = {}):
        self._engine = create_async_engine(host, **engine_kwargs)
        self._sessionmaker = async_sessionmaker(autocommit=False, bind=self._engine)

    async def close(self):
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")
        await self._engine.dispose()

        self._engine = None
        self._sessionmaker = None

    @asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception:
                await connection.rollback()
                raise

    @asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        if self._sessionmaker is None:
            raise Exception("DatabaseSessionManager is not initialized")

        session = self._sessionmaker()
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

url = URL.create(
    "postgresql+asyncpg",
    username=config.database.DB_USERNAME,
    password=db_password,
    host=config.database.DB_HOST,
    port=config.database.DB_PORT,
    database=config.database.DB_NAME
)

session_manager = DatabaseSessionManager(url, {"echo": config.database.DB_ECHO})

async def init_admin():
    async with session_manager.session() as session:
        admin = (await session.scalars(select(UserModel).where(UserModel.email == config.admin.ADMIN_EMAIL))).first()
        if not admin:
            admin = UserModel(
                email=config.admin.ADMIN_EMAIL,
                password_hash=admin_password_hash,
                first_name=config.admin.ADMIN_FIRST_NAME,
                last_name=config.admin.ADMIN_LAST_NAME,
                role="admin"
            )
            session.add(admin)
            await session.commit()