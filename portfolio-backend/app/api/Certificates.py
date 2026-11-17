from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import require_admin

from app.schemas.certificates import Certificates as CertificateResponse
from app.schemas.certificates import (
    CertificatesUpdate,
    CertificatesCreate
)

from app.services.certificates_service import *

router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"]
)

dbSession = Annotated[Session, Depends(get_db)]

@router.get("", response_model=list[CertificateResponse])
def Get_all_Certificates(db: dbSession):
    return Get_All_Certificates(db)

@router.get("/{id}")
def Get_Certificate_By_id(id: int, db: dbSession):
    target = Get_Certain_Certificate(db=db, id=id)

    if target is None:
        raise HTTPException(
            status_code=404,
            detail="Can't find out the request Certificate"
        )

    return target

@router.post(
    "",
    response_model=CertificateResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin)])
def Create_Certificate(db: dbSession, data: CertificatesCreate):
    try:
        return Create_Certificate_Item(db=db, data=data)
    except Exception as e:
        raise HTTPException(
            status_code=409,
            detail="Certificate item can't create"
        )

@router.patch(
    "/{id}",
    response_model=CertificateResponse,
    dependencies=[Depends(require_admin)])
def Update_Certificate_By_id(db: dbSession, data: CertificatesUpdate, id: int):
    updated_data = Get_Certain_Certificate(db, id)

    if updated_data is None:
        raise HTTPException(
            status_code=404,
            detail="Certificate is not found"
        )

    try:
        return Update_Certificate_Item(db=db, new_data=data, data=updated_data)
    except Exception as e:
        raise HTTPException(
            status_code=409,
            detail="Certificate data conflicts with a database constraint",
        )

@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin)])
def Delete_Certificate_By_id(db: dbSession, id: int):
    target = Get_Certain_Certificate(db=db, id=id)

    if target is None:
        raise HTTPException(
            status_code=404,
            detail="Certificate is not found"
        )

    Delete_Certificate_Item(db=db, data=target)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
