from fastapi import APIRouter, HTTPException
from ..database import execute_query
from ..models import ContactIn, ContactOut

router = APIRouter()


@router.post("/contact", response_model=ContactOut)
def submit_contact(body: ContactIn):
    try:
        execute_query(
            """
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s)
            """,
            (body.name, body.email, body.message),
            fetch=False
        )
        return ContactOut(success=True, message="Message received successfully!")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
