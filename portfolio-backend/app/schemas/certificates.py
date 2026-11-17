from pydantic import BaseModel, ConfigDict, Field

class CertificatesCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    year: str = Field(
        min_length=4,
        max_length=10
    )

    name: str = Field(
        min_length=1,
        max_length=100
    )

class CertificatesUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    year: str = Field(
        min_length=4,
        max_length=10
    )

    name: str = Field(
        min_length=1,
        max_length=20
    )

class Certificates(BaseModel):
    id: int
    year: str
    name: str

    model_config = ConfigDict(from_attributes=True)