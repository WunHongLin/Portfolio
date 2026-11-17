from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.security import require_admin

from app.services.projects_service import (
    Get_All_Projects,
    Get_Project_Item_By_id,
    Create_Project_Item,
    Update_Project_Item,
    Delete_Project_Item
)

from app.schemas.projects import Projects as ProjectResponse
from app.schemas.projects import (
    ProjectUpdate,
    ProjectCreate
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

dbSession = Annotated[Session, Depends(get_db)]

@router.get("", response_model=list[ProjectResponse])
def All_Projects(db: dbSession):
    return Get_All_Projects(db)

@router.get("/{id}")
def Get_Project_By_id(db: dbSession, id: int):
    target = Get_Project_Item_By_id(db=db, id=id)

    if target is None:
        raise HTTPException(
            status_code=404,
            detail="Can't find the target project"
        )

    return target

@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin)])
def Create_Project(db: dbSession, data: ProjectCreate):
    try: 
        return Create_Project_Item(db=db, data=data)
    except Exception as e:
        raise HTTPException(
            status_code=409,
            detail="Can't create the project item"
        )

@router.patch(
    "/{id}",
    response_model=ProjectResponse,
    dependencies=[Depends(require_admin)])
def Update_Project_By_id(db: dbSession, id: int, new_data: ProjectUpdate):
    updated_data = Get_Project_By_id(db=db, id=id)

    if updated_data is None:
        raise HTTPException(
            status_code=404,
            detail="Can't find the target project"
        )

    try:
        return Update_Project_Item(db, data=updated_data, new_data=new_data)
    except Exception as e:
        raise HTTPException(
            status_code=409,
            detail="project data conflicts with a database constraint",
        )

@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin)])
def Delete_Project_By_id(db: dbSession, id: int):
    deleted_data = Get_Project_By_id(db=db, id=id)

    if deleted_data is None:
        raise HTTPException(
                status_code=404,
                detail="Can't find the target project"
            )

    Delete_Project_Item(db=db, data=deleted_data)

    return HTTPException(
        status_code=status.HTTP_204_NO_CONTENT
    )