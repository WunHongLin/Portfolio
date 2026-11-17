from typing import Any

from sqlalchemy import (
    String,
    Text,
)

from sqlalchemy.orm import mapped_column, Mapped
from app.db.base import Base

class Award(Base):
    __tablename__ = "award"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    year: Mapped[str] = mapped_column(
        String(30),
        unique=False,
        nullable=False,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(60),
        unique=True,
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )
