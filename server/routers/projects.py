from fastapi import APIRouter, HTTPException
from typing import List
from ..database import execute_query
from ..models import ProjectOut

router = APIRouter()


@router.get("/projects", response_model=List[ProjectOut])
def get_projects():
    try:
        rows = execute_query(
            "SELECT * FROM projects ORDER BY display_order ASC"
        )
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
