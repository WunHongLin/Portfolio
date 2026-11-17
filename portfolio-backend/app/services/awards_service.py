from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.award import Award
from app.schemas.awards import (
    AwardsCreate,
    AwardsUpdate
)

def get_Awards(db: Session) -> list[Award]:
    # 取的所有對應的資料
    statement = (
        select(Award)
        .order_by(
            Award.id.asc(),
            Award.year.asc(),
        )
    )

    awards = db.scalars(statement=statement).all()

    return list(awards)


def get_Award_by_id(db: Session, id: int) -> Award | None:
    # 取得單一作品
    return db.get(Award, id)


def create_award(
    db: Session,
    data: AwardsCreate
) -> Award:
    # 新增資料
    award = Award(**data.model_dump())

    db.add(award)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise

    db.refresh(award)

    return award

def update_award(
    db: Session,
    data: Award,
    new_data: AwardsUpdate
) -> Award:
    # 更新資料
    updated_data = new_data.model_dump(
        exclude_unset=True
    )

    for key, value in updated_data.items():
        setattr(data, key, value)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise

    db.refresh(data)

    return data

def delete_award(
    db: Session,
    data: Award
) -> None:
    # 刪除資料
    db.delete(data)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise
