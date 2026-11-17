from pydantic import BaseModel, ConfigDict, Field

class AwardsCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    year: str = Field(
        min_length=4,
        max_length=10
    )

    title: str = Field(
        min_length=1,
        max_length=100
    )

    description: str | None = Field(
        default=None,
        min_length=1,
        max_length=200
    )

class AwardsUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    year: str = Field(
        min_length=4,
        max_length=10
    )

    title: str = Field(
        min_length=1,
        max_length=100
    )

    description: str | None = Field(
        default=None,
        min_length=1,
        max_length=200
    )

class Awards(BaseModel):
    id: int
    year: str
    title: str
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)