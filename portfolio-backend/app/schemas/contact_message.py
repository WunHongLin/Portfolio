
from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)


class ContactMessageCreate(BaseModel):
    model_config = ConfigDict(
        extra="forbid",
        str_strip_whitespace=True,
    )

    name: str = Field(
        min_length=1,
        max_length=120,
    )

    email: EmailStr

    subject: str = Field(
        min_length=1,
        max_length=200,
    )

    message: str = Field(
        min_length=1,
        max_length=5000,
    )


class ContactMessageResponse(BaseModel):
    message: str

class ContactMessage(BaseModel):
    id:int
    name: str
    email: EmailStr
    subject: str
    message: str

    model_config = ConfigDict(from_attributes=True)
