from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import MessageResponse, PredictionRequest, PredictionResponse
from app.agents.market_data import get_market_data_agent
from app.agents.news_analysis import get_news_analysis_agent
from app.agents.technical_analysis import get_technical_analysis_agent
from app.agents.economic_sentiment import get_economic_sentiment_agent
from app.agents.chief_predictor import get_chief_predictor_agent
from google_adk import Session
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
    
    # セッションの作成と実行
    session = Session()
    
    # 各専門エージェントに情報を収集させる
    # 注意: ここでは簡易的に直列実行していますが、本来は並列実行が効率的です
    market_report = session.run(market_agent, "現在の日経平均(^N225)と関連指数、ドル円のデータを報告して")
    news_report = session.run(news_agent, "日経平均に関連する最新ニュースとセンチメントを報告して")
    tech_report = session.run(tech_agent, "日経平均(^N225)のテクニカル指標とシグナルを分析して")
    econ_report = session.run(econ_agent, "現在の世界経済状況と日経平均への影響をマクロ視点で分析して")
    
    # 部長（Chief）が全てをまとめて最終予測を出す
    final_input = f"""
以下の部下からの報告を元に、最終的な予測を作成してください。

[市場データ]
{market_report.text}

[ニュース分析]
{news_report.text}

[テクニカル分析]
{tech_report.text}

[経済センチメント]
{econ_report.text}
"""
    final_prediction = session.run(chief_agent, final_input)
    
    return {
        "prediction": final_prediction.text,
        "agent_reports": [
            {"agent": "MarketData", "report": market_report.text},
            {"agent": "NewsAnalysis", "report": news_report.text},
            {"agent": "TechnicalAnalysis", "report": tech_report.text},
            {"agent": "EconomicSentiment", "report": econ_report.text},
        ]
    }
