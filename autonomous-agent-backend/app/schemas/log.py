from typing import Optional
from pydantic import BaseModel


class Log(BaseModel):
    id: int
    function_id: Optional[int]
    inputs: str
    outputs: str
    errors: Optional[str]
    timestamp: str

    class Config:
        orm_mode = True