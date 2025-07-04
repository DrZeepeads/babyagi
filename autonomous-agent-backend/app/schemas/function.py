from typing import List, Optional
from pydantic import BaseModel


class FunctionBase(BaseModel):
    name: str
    description: Optional[str] = None
    code: Optional[str] = None
    imports: Optional[List[str]] = []
    dependencies: Optional[List[str]] = []
    secret_keys: Optional[List[str]] = []


class FunctionCreate(FunctionBase):
    pass


class Function(FunctionBase):
    id: int

    class Config:
        orm_mode = True