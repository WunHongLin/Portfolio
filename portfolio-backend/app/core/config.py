
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.engine import URL


# 取得 Blog 專案根目錄
PROJECT_ROOT = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    postgres_user: str
    postgres_password: str
    postgres_db: str
    database_host: str = "127.0.0.1"
    database_port: int = 15433

    admin_api_key: str | None = None
    frontend_url: str = "http://127.0.0.1:3000"

    model_config = SettingsConfigDict(
        env_file=PROJECT_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def database_url(self) -> URL:
        return URL.create(
            drivername="postgresql+psycopg",
            username=self.postgres_user,
            password=self.postgres_password,
            host=self.database_host,
            port=self.database_port,
            database=self.postgres_db,
        )


settings = Settings()
