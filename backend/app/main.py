from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import MessageResponse
from app.auth import setup_google_credentials
from app.routers import predict


# Initialize Google Cloud Credentials
setup_google_credentials()

app = FastAPI(title="ADK Docker Backend API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(predict.router, prefix="/api", tags=["predict"])
# WebSocket endpoint needs to be handled separately if it's not under /api prefix in the frontend
# In App.tsx: ws://localhost:8000/ws/predict
app.include_router(predict.router)


@app.get("/", response_model=MessageResponse)
async def root():
    return MessageResponse(message="Hello from FastAPI backend!")


@app.get("/health")
async def health_check():
    return {"status": "ok"}
