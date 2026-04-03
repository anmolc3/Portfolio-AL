from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime


class ProjectOut(BaseModel):
    id: int
    title: str
    description: str
    tags: List[str]
    gradient: str
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    display_order: int


class SkillOut(BaseModel):
    id: int
    name: str
    category: str


class ContactIn(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactOut(BaseModel):
    success: bool
    message: str
