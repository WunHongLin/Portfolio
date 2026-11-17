from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.certificate import Certificate
from app.schemas.certificates import (
    CertificatesCreate,
    CertificatesUpdate
)

def Get_All_Certificates(db: Session) -> list[Certificate]:
    statement = (
        select(Certificate).
        order_by(
            Certificate.id.asc(),
            Certificate.year.asc()
        )
    )

    Search_Result = db.scalars(statement=statement).all()

    return list(Search_Result)

def Get_Certain_Certificate(db: Session, id: int) -> Certificate | None:
    return db.get(Certificate, id)

def Create_Certificate_Item(db: Session, data: CertificatesCreate) -> Certificate:
    certificate = Certificate(**data.model_dump())

    db.add(certificate)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise

    db.refresh(certificate)

    return certificate

def Update_Certificate_Item(db: Session, new_data: CertificatesUpdate, data: Certificate) -> Certificate:
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

def Delete_Certificate_Item(db: Session, data: Certificate) -> None:
    db.delete(data)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise

