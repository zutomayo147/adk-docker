from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import MessageResponse, PredictionRequest, PredictionResponse
from app.agents.market_data import get_market_data_agent
from app.agents.news_analysis import get_news_analysis_agent
from app.agents.technical_analysis import get_technical_analysis_agent
from app.agents.economic_sentiment import get_economic_sentiment_agent
from app.agents.chief_predictor import get_chief_predictor_agent
from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
from app.auth import setup_google_credentials

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

def run_agent_task(agent, message, session_service):
    """エージェントを実行して最終的なテキスト回答を取得するヘルパー"""
    runner = Runner(
        agent=agent,
        app_name="NikkeiPredictor",
        session_service=session_service,
        auto_create_session=True
    )
    
    # メッセージを構造化オブジェクトに変換
    new_message = Content(role="user", parts=[Part(text=message)])
    
    events = runner.run(
        user_id="web_user",
        session_id="web_session",
        new_message=new_message
    )
    full_text = ""
    for event in events:
        if event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, 'text') and part.text:
                    full_text += part.text
    return full_text

@app.get("/", response_model=MessageResponse)
async def root():
    return {"message": "Hello from FastAPI backend!"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_nikkei(request: PredictionRequest):
    # エージェントの初期化
    market_agent = get_market_data_agent()
    news_agent = get_news_analysis_agent()
    tech_agent = get_technical_analysis_agent()
    econ_agent = get_economic_sentiment_agent()
    chief_agent = get_chief_predictor_agent()
    
    session_service = InMemorySessionService()
    
    # 各専門エージェントに情報を収集させる
    market_text = run_agent_task(market_agent, "現在の日経平均(^N225)と関連指数、ドル円のデータを報告して", session_service)
    news_text = run_agent_task(news_agent, "日経平均に関連する最新ニュースとセンチメントを報告して", session_service)
    tech_text = run_agent_task(tech_agent, "日経平均(^N225)のテクニカル指標とシグナルを分析して", session_service)
    econ_text = run_agent_task(econ_agent, "現在の世界経済状況と日経平均への影響をマクロ視点で分析して", session_service)
    
    # 部長（Chief）が全てをまとめて最終予測を出す
    final_input = f"""
以下の部下からの報告を元に、最終的な予測を作成してください。

[市場データ]
{market_text}

[ニュース分析]
{news_text}

[テクニカル分析]
{tech_text}

[経済センチメント]
{econ_text}
"""
    final_prediction_text = run_agent_task(chief_agent, final_input, session_service)
    
    return {
        "prediction": final_prediction_text,
        "agent_reports": [
            {"agent": "MarketData", "report": market_text},
            {"agent": "NewsAnalysis", "report": news_text},
            {"agent": "TechnicalAnalysis", "report": tech_text},
            {"agent": "EconomicSentiment", "report": econ_text},
        ]
    }
