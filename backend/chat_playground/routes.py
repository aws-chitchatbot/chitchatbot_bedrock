from fastapi import APIRouter, HTTPException, status
from botocore.exceptions import ClientError
from .models import User
from .services import create_user
from . import models
from . import services

router = APIRouter()

@router.post("/foundation-models/model/chat/anthropic.claude-v2/invoke")
def invoke(body: models.ChatRequest):
    try:
        completion = services.invoke(body.prompt)
        return models.ChatResponse(
            completion=completion
        )
    except ClientError as e:
        if e.response["Error"]["Code"] == "AccessDeniedException":
            raise HTTPException(status_code=403)
        else:
            raise HTTPException(status_code=500)

@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register_user(user: User):
    try:
        await create_user(user)
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error creating user")