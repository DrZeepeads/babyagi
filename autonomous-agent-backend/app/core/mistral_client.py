import os
import httpx
from typing import AsyncGenerator, List

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
MISTRAL_BASE_URL = "https://api.mistral.ai/v1"

headers = {
    "Authorization": f"Bearer {MISTRAL_API_KEY}",
    "Content-Type": "application/json",
}


async def stream_markdown(prompt: str, model: str = "mistral-medium") -> AsyncGenerator[str, None]:
    """Streams markdown response chunks from Mistral."""
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt},
        ],
        "stream": True,
    }

    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", f"{MISTRAL_BASE_URL}/chat/completions", headers=headers, json=payload) as resp:
            async for line in resp.aiter_lines():
                if line.startswith("data: "):
                    data = line.removeprefix("data: ").strip()
                    if data == "[DONE]":
                        break
                    # Each data line is JSON with choices[0].delta.content
                    try:
                        import json

                        payload = json.loads(data)
                        delta = payload["choices"][0]["delta"].get("content", "")
                        if delta:
                            yield delta
                    except Exception:
                        continue