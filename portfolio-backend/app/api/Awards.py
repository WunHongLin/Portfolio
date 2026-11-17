from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import require_admin

# response_model
from app.schemas.awards import Awards as AwardResponse
from app.schemas.awards import (
    AwardsUpdate,
    AwardsCreate
)

# service model
from app.services.awards_service import (
    get_Award_by_id,
    get_Awards,
    create_award,
    update_award,
    delete_award
)

router = APIRouter(
    prefix="/award",
    tags=["Awards"]
)

dbSession = Annotated[Session, Depends(get_db)]

# 取得全部資料
@router.get("", response_model=list[AwardResponse])
def get_award_all(db: dbSession):
    return get_Awards(db)

# 取得單一資料
@router.get("/{id}", response_model=AwardResponse)
def get_award_by_id(
    id: int,
    db: dbSession
):

    target = get_Award_by_id(db, id)

    if target is None:
        raise HTTPException(
            status_code=404,
            detail="Can't find out the correspons award data!!"
        )

    return target

# 新增資料
@router.post(
    "",
    response_model=AwardResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin)]
)
def add_award(db: dbSession, data: AwardsCreate):
    try:
        return create_award(db=db, data=data)
    except Exception as e:
        raise HTTPException(
            status_code=409,
            detail="Award data can't create"
        )

# 更新資料
@router.patch(
    "/{id}",
    response_model=AwardResponse,
    dependencies=[Depends(require_admin)]
)
def edit_award(db: dbSession, data: AwardsUpdate, id: int):
    award = get_Award_by_id(db, id)

    if award is None:
        raise HTTPException(
            status_code=404,
            detail="award is not found",
        )

    try:
        return update_award(db=db, data=award, new_data=data)
    except Exception as e:
        raise HTTPException(
            status_code=409,
            detail="award data conflicts with a database constraint",
        )


# 刪除資料
@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin)]
)
def remove_award(db: dbSession, id: int):
    award = get_Award_by_id(db, id)

    if award is None:
        raise HTTPException(
            status_code=404,
            detail="award is not found",
        )

    delete_award(db, award)

    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )