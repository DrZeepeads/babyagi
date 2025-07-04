from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.function import Function as FunctionModel
from app.schemas.function import Function, FunctionCreate

router = APIRouter(prefix="/functions", tags=["functions"])


@router.post("/", response_model=Function, status_code=status.HTTP_201_CREATED)
def create_function(function_in: FunctionCreate, db: Session = Depends(get_db)):
    if db.query(FunctionModel).filter(FunctionModel.name == function_in.name).first():
        raise HTTPException(status_code=400, detail="Function already exists")
    fn_obj = FunctionModel(**function_in.dict())
    db.add(fn_obj)
    db.commit()
    db.refresh(fn_obj)
    return fn_obj


@router.get("/", response_model=List[Function])
def list_functions(db: Session = Depends(get_db)):
    return db.query(FunctionModel).all()


@router.get("/{function_id}", response_model=Function)
def get_function(function_id: int, db: Session = Depends(get_db)):
    fn = db.query(FunctionModel).get(function_id)
    if not fn:
        raise HTTPException(status_code=404, detail="Function not found")
    return fn


@router.put("/{function_id}", response_model=Function)
def update_function(function_id: int, function_in: FunctionCreate, db: Session = Depends(get_db)):
    fn = db.query(FunctionModel).get(function_id)
    if not fn:
        raise HTTPException(status_code=404, detail="Function not found")
    for k, v in function_in.dict().items():
        setattr(fn, k, v)
    db.commit()
    db.refresh(fn)
    return fn


@router.delete("/{function_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_function(function_id: int, db: Session = Depends(get_db)):
    fn = db.query(FunctionModel).get(function_id)
    if not fn:
        raise HTTPException(status_code=404, detail="Function not found")
    db.delete(fn)
    db.commit()
    return