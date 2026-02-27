from pydantic import BaseModel
from typing import List, Optional


class MessageResponse(BaseModel):
    message: str


class AgentReport(BaseModel):
    agent: str
    report: str


class PredictionRequest(BaseModel):
    query: Optional[str] = "明日の日経平均株価の予測をお願いします。"


class PredictionResponse(BaseModel):
    prediction: str
    agent_reports: List[AgentReport]


class WSStatus(BaseModel):
    type: str = "status"
    agent: str
    status: str  # "starting", "running", "completed", "error"
    message: str


class WSResponse(BaseModel):
    type: str = "result"
    prediction: str
    agent_reports: List[AgentReport]


class WSPartialResult(BaseModel):
    type: str = "partial"
    agent: str
    content: str
