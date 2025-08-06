from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings, YamlConfigSettingsSource, SettingsConfigDict, PydanticBaseSettingsSource

BASE_DIR = Path(__file__).resolve().parent

class AuthSettings(BaseModel):
    JWT_ALG: str
    JWT_SECRET_PATH: str
    JWT_EXP: int = 5

class DatabaseSettings(BaseModel):
    DB_HOST: str
    DB_PORT: int
    DB_USERNAME: str
    DB_PASSWORD_PATH: str
    DB_NAME: str

class AdminSettings(BaseModel):
    ADMIN_EMAIL: str
    ADMIN_FIRST_NAME: str
    ADMIN_LAST_NAME: str
    ADMIN_PASSWORD_HASH_PATH: str

class AppConfig(BaseSettings):
    auth: AuthSettings
    database: DatabaseSettings
    admin: AdminSettings
    model_config = SettingsConfigDict(
        yaml_file=f'{BASE_DIR}/config/config.yml',
        env_nested_delimiter='__',
        env_file=f'{BASE_DIR.parent}/.env'
    )

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> tuple[PydanticBaseSettingsSource, ...]:
        return (env_settings, YamlConfigSettingsSource(settings_cls), init_settings, dotenv_settings, file_secret_settings)
    
config = AppConfig()