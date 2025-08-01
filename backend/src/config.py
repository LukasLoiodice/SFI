from pydantic import BaseModel
from pydantic_settings import BaseSettings, YamlConfigSettingsSource, SettingsConfigDict, PydanticBaseSettingsSource

class AuthSettings(BaseModel):
    JWT_ALG: str
    JWT_SECRET: str
    JWT_EXP: int = 5

class AppConfig(BaseSettings):
    auth: AuthSettings
    model_config = SettingsConfigDict(yaml_file='config/config.yml', env_nested_delimiter='__')

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