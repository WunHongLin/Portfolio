from typing import Any

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import (
    JSON,
    String,
    TEXT
)

from app.db.base import Base
 
class Project(Base):
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    slug: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    description: Mapped[str] = mapped_column(
        TEXT,
        nullable=False
    )

    image: Mapped[str] = mapped_column(
        String(100),
        unique=False,
        nullable=False,
        index=True
    )

    technologies: Mapped[list[str]] = mapped_column(
        JSON,
        nullable=False
    )

    details: Mapped[str] = mapped_column(
        TEXT,
        nullable=False,
        unique=False,
        index=True
    )