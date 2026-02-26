from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import MessageResponse

app = FastAPI(title="ADK Docker Backend API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=MessageResponse)
async def root():
    return {"message": "Hello from FastAPI backend!"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}
