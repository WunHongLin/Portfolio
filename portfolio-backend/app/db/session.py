
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings


# 建立資料庫 Engine
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    echo=False,
)


# 建立 Session 工廠
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    expire_on_commit=False,
)


# 未來提供給 FastAPI Router 使用
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
