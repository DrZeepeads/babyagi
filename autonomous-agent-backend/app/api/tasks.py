import uuid
from fastapi import APIRouter, BackgroundTasks, Request
from fastapi.responses import StreamingResponse, JSONResponse
import asyncio
from app.core.mistral_client import stream_markdown

router = APIRouter(prefix="/tasks", tags=["tasks"])

# In-memory store for demo; replace with DB
TASK_RESPONSES: dict[str, str] = {}


async def generate_ai_response_async(task_id: str, prompt: str):
    aggregated = []
    async for chunk in stream_markdown(prompt):
        aggregated.append(chunk)
        TASK_RESPONSES[task_id] = "".join(aggregated)
    TASK_RESPONSES[task_id] += "\n**Completed**"


def generate_ai_response(task_id: str, prompt: str):
    # Run async Mistral client in sync background
    asyncio.run(generate_ai_response_async(task_id, prompt))


@router.post("/")
async def submit_task(payload: dict, background_tasks: BackgroundTasks):
    prompt = payload.get("prompt")
    if not prompt:
        return JSONResponse(status_code=400, content={"detail": "Prompt required"})
    task_id = str(uuid.uuid4())
    TASK_RESPONSES[task_id] = ""
    background_tasks.add_task(generate_ai_response, task_id, prompt)
    return {"task_id": task_id}


@router.get("/stream/{task_id}")
async def stream_task(task_id: str):
    async def event_generator():
        last = ""
        while True:
            content = TASK_RESPONSES.get(task_id, "")
            if content != last:
                last = content
                yield f"data: {content}\n\n"
            if "**Completed**" in content:
                break
            import asyncio
            await asyncio.sleep(0.5)

    return StreamingResponse(event_generator(), media_type="text/event-stream")