from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.function import Function as FunctionModel

router = APIRouter(prefix="/graph", tags=["graph"])


@router.get("/")
def get_dependency_graph(db: Session = Depends(get_db)):
    nodes = []
    edges = []
    functions = db.query(FunctionModel).all()
    for fn in functions:
        nodes.append({"data": {"id": fn.name, "label": fn.name}})
        for dep in fn.dependencies or []:
            edges.append({"data": {"source": dep, "target": fn.name}})
    return {"nodes": nodes, "edges": edges}