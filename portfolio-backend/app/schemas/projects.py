from pydantic import BaseModel, Field, ConfigDict

class ProjectCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    slug: str = Field(
        min_length=1,
        max_length=100
    )

    title: str = Field(
        min_length=1,
        max_length=50
    )

    description: str = Field(
        min_length=1
    )

    image: str = Field(
        min_length=1,
        max_length=50
    )

    technologies: list[str] = Field(
        min_length=1
    )

    details: str = Field(
        min_length=1
    )

class ProjectUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    slug: str = Field(
        min_length=1,
        max_length=100
    )

    title: str = Field(
        min_length=1,
        max_length=50
    )

    description: str = Field(
        min_length=1
    )

    image: str = Field(
        min_length=1,
        max_length=50
    )

    technologies: list[str] = Field(
        min_length=1
    )

    details: str = Field(
        min_length=1
    )

class Projects(BaseModel):
    id: int
    slug: str
    title: str
    description: str
    image: str
    technologies: list[str]
    details: str

    model_config = ConfigDict(from_attributes=True)