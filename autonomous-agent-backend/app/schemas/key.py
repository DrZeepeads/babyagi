from typing import Optional
from pydantic import BaseModel


class KeyBase(BaseModel):
    name: str
    value: str


class KeyCreate(KeyBase):
    pass


class Key(KeyBase):
    id: int
    created_at: Optional[str]

    class Config:
        orm_mode = True