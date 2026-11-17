from typing import Any

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import (
    Text,
    String,
)

from app.db.base import Base

class Certificate(Base):
    __tablename__ = "certificate"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    year: Mapped[str] = mapped_column(
        String(30),
        unique=False,
        nullable=False,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(60),
        unique=True,
        nullable=False,
        index=True
    )