from fastapi import APIRouter, HTTPException
from typing import List
from ..database import execute_query
from ..models import SkillOut

router = APIRouter()


@router.get("/skills", response_model=List[SkillOut])
def get_skills():
    try:
        rows = execute_query(
            "SELECT * FROM skills ORDER BY category, name ASC"
        )
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
