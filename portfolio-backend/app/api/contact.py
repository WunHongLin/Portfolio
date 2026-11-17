
import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.contact_message import ContactMessage as MessageResponse
from app.schemas.contact_message import (
    ContactMessageCreate,
    ContactMessageResponse,
)
from app.services.contact_service import create_contact_message, get_all_contact_message


logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/contact",
    tags=["Contact"],
)

DbSession = Annotated[Session, Depends(get_db)]

@router.get(
    "",
    response_model=list[MessageResponse]
)
def get_all_messages(db: DbSession):
    return get_all_contact_message(db=db)

@router.post(
    "",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact(
    data: ContactMessageCreate,
    db: DbSession,
):
    try:
        create_contact_message(db, data)
    except Exception:
        # 不把姓名、Email、訊息內容寫入日誌
        logger.error("Contact message database write failed")
        raise HTTPException(
            status_code=503,
            detail="Unable to save message",
        )

    return ContactMessageResponse(
        message="訊息已成功送出！感謝你的聯絡。"
    )
