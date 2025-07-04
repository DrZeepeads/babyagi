from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.key import Key as KeyModel
from app.schemas.key import Key, KeyCreate

router = APIRouter(prefix="/keys", tags=["keys"])


@router.post("/", response_model=Key, status_code=status.HTTP_201_CREATED)
def create_key(key_in: KeyCreate, db: Session = Depends(get_db)):
    if db.query(KeyModel).filter(KeyModel.name == key_in.name).first():
        raise HTTPException(status_code=400, detail="Key already exists")
    key_obj = KeyModel(**key_in.dict())
    db.add(key_obj)
    db.commit()
    db.refresh(key_obj)
    return key_obj


@router.get("/", response_model=List[Key])
def list_keys(db: Session = Depends(get_db)):
    return db.query(KeyModel).all()


@router.delete("/{key_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_key(key_id: int, db: Session = Depends(get_db)):
    key = db.query(KeyModel).get(key_id)
    if not key:
        raise HTTPException(status_code=404, detail="Key not found")
    db.delete(key)
    db.commit()
    return