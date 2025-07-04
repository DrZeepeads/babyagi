from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Autonomous Agent Backend")

# CORS configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Include routers
from app.api import functions as functions_router  # noqa: E402
from app.api import keys as keys_router  # noqa: E402
from app.api import tasks as tasks_router  # noqa: E402
from app.api import logs as logs_router  # noqa: E402
from app.api import graph as graph_router  # noqa: E402

app.include_router(functions_router.router)
app.include_router(keys_router.router)
app.include_router(tasks_router.router)
app.include_router(logs_router.router)
app.include_router(graph_router.router)

# Create tables on startup (simple)
from app.db.session import Base, engine  # noqa: E402

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)