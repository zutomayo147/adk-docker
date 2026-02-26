from pydantic import BaseModel
from typing import List, Optional

class MessageResponse(BaseModel):
    message: str

class PredictionRequest(BaseModel):
    query: Optional[str] = "明日の日経平均株価の予測をお願いします。"

class PredictionResponse(BaseModel):
    prediction: str
    agent_reports: List[dict]
