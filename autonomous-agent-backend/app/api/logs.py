from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.log import Log as LogModel
from app.schemas.log import Log

router = APIRouter(prefix="/logs", tags=["logs"])


@router.get("/", response_model=List[Log])
def list_logs(db: Session = Depends(get_db)):
    return db.query(LogModel).order_by(LogModel.timestamp.desc()).all()