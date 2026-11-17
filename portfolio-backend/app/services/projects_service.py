from sqlalchemy.orm import Session
from sqlalchemy import select

from app.models.project import Project
from app.schemas.projects import (
    ProjectCreate,
    ProjectUpdate
)

def Get_All_Projects(db: Session) -> list[Project]:
    statement = (
        select(Project)
        .order_by(
            Project.id.asc(),
        )
    )

    results = db.scalars(statement=statement).all()

    return list(results)

def Get_Project_Item_By_id(db: Session, id: int) -> Project | None:
    return db.get(Project, id)

def Create_Project_Item(db: Session, data: ProjectCreate) -> Project:
    project = Project(**data.model_dump())

    db.add(project)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise

    db.refresh(project)

    return project

def Update_Project_Item(db: Session, data: Project, new_data: ProjectUpdate) -> Project:
    updated_data = new_data.model_dump(exclude_unset=True)

    for key, value in updated_data.items():
        setattr(data, key, value)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise

    db.refresh(data)

    return data

def Delete_Project_Item(db: Session, data: Project) -> None:
    db.delete(data)

    try: 
        db.commit()
    except Exception as e:
        db.rollback()
        raise
