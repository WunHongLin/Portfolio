
from sqlalchemy.orm import Session
from sqlalchemy import Select

from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate

def get_all_contact_message(db: Session) -> list[ContactMessage]:
    statement = (
        Select(ContactMessage)
        .order_by(
            ContactMessage.id.asc()
        )
    )

    allMessages = db.scalars(statement=statement).all()

    return list(allMessages)

def create_contact_message(
    db: Session,
    data: ContactMessageCreate,
) -> None:
    contact = ContactMessage(
        **data.model_dump()
    )

    db.add(contact)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise
