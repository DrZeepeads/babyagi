import uuid
from fastapi import APIRouter, BackgroundTasks, Request
from fastapi.responses import StreamingResponse, JSONResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

# In-memory store for demo; replace with DB
TASK_RESPONSES: dict[str, str] = {}


def generate_ai_response(task_id: str, prompt: str):
    # TODO: Call Mistral API
    import time, random
    messages = [
        "Processing your task...",
        "Thinking...",
        "Almost done...",
        f"Generated code for: {prompt}",
    ]
    aggregated = []
    for m in messages:
        time.sleep(random.uniform(0.5, 1.2))
        aggregated.append(m)
        TASK_RESPONSES[task_id] = "\n".join(aggregated)
    TASK_RESPONSES[task_id] += "\n**Completed**"


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