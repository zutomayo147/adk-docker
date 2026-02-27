from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.schemas import AgentReport, PredictionRequest, PredictionResponse, WSStatus, WSResponse, WSPartialResult
from app.agents.market_data import get_market_data_agent
from app.agents.news_analysis import get_news_analysis_agent
from app.agents.technical_analysis import get_technical_analysis_agent
from app.agents.economic_sentiment import get_economic_sentiment_agent
from app.agents.chief_predictor import get_chief_predictor_agent
from app.runner import run_agent_task, run_agent_task_stream
from google.adk.sessions import InMemorySessionService
import json

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_nikkei(request: PredictionRequest):
    market_agent = get_market_data_agent()
    news_agent = get_news_analysis_agent()
    tech_agent = get_technical_analysis_agent()
    econ_agent = get_economic_sentiment_agent()
    chief_agent = get_chief_predictor_agent()

    session_service = InMemorySessionService()

    market_text = run_agent_task(market_agent, "現在の日経平均(^N225)と関連指数、ドル円のデータを報告して", session_service)
    news_text = run_agent_task(news_agent, "日経平均に関連する最新ニュースとセンチメントを報告して", session_service)
    tech_text = run_agent_task(tech_agent, "日経平均(^N225)のテクニカル指標とシグナルを分析して", session_service)
    econ_text = run_agent_task(econ_agent, "現在の世界経済状況と日経平均への影響をマクロ視点で分析して", session_service)

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

    return PredictionResponse(
        prediction=final_prediction_text,
        agent_reports=[
            AgentReport(agent="MarketData", report=market_text),
            AgentReport(agent="NewsAnalysis", report=news_text),
            AgentReport(agent="TechnicalAnalysis", report=tech_text),
            AgentReport(agent="EconomicSentiment", report=econ_text),
        ],
    )

@router.websocket("/ws/predict")
async def websocket_predict(websocket: WebSocket):
    await websocket.accept()
    try:
        data = await websocket.receive_text()
        try:
            request_data = json.loads(data)
            custom_prompt = request_data.get("query", "明日の日経平均株価の予測をお願いします。")
        except json.JSONDecodeError:
            custom_prompt = "明日の日経平均株価の予測をお願いします。"

        agents = {
            "MarketData": get_market_data_agent(),
            "NewsAnalysis": get_news_analysis_agent(),
            "TechnicalAnalysis": get_technical_analysis_agent(),
            "EconomicSentiment": get_economic_sentiment_agent(),
        }
        chief_agent = get_chief_predictor_agent()
        session_service = InMemorySessionService()

        reports = []
        prompts = {
            "MarketData": "現在の日経平均(^N225)と関連指数、ドル円のデータを報告して",
            "NewsAnalysis": "日経平均に関連する最新ニュースとセンチメントを報告して",
            "TechnicalAnalysis": "日経平均(^N225)のテクニカル指標とシグナルを分析して",
            "EconomicSentiment": "現在の世界経済状況と日経平均への影響をマクロ視点で分析して",
        }

        for agent_name, agent in agents.items():
            await websocket.send_json(WSStatus(
                agent=agent_name,
                status="running",
                message=f"{agent_name}エージェントが分析を開始しました..."
            ).model_dump())

            report_text = ""
            async for event in run_agent_task_stream(agent, prompts[agent_name], session_service):
                if event["type"] == "tool_call":
                    await websocket.send_json(WSStatus(
                        agent=agent_name,
                        status="running",
                        message=f"ツール実行中: {event['name']}({event['args']})"
                    ).model_dump())
                elif event["type"] == "final_text":
                    report_text = event["text"]

            reports.append(AgentReport(agent=agent_name, report=report_text))

            await websocket.send_json(WSStatus(
                agent=agent_name,
                status="completed",
                message=f"{agent_name}エージェントの分析が完了しました。"
            ).model_dump())

        await websocket.send_json(WSStatus(
            agent="ChiefPredictor",
            status="running",
            message="部長エージェントが最終予測を作成中です..."
        ).model_dump())

        final_input = f"""
{custom_prompt}

以下の部下からの報告を元に、最終的な予測を作成してください。

[市場データ]
{next(r.report for r in reports if r.agent == "MarketData")}

[ニュース分析]
{next(r.report for r in reports if r.agent == "NewsAnalysis")}

[テクニカル分析]
{next(r.report for r in reports if r.agent == "TechnicalAnalysis")}

[経済センチメント]
{next(r.report for r in reports if r.agent == "EconomicSentiment")}
"""
        final_prediction_text = ""
        async for event in run_agent_task_stream(chief_agent, final_input, session_service):
            if event["type"] == "tool_call":
                await websocket.send_json(WSStatus(
                    agent="ChiefPredictor",
                    status="running",
                    message=f"ツール実行中: {event['name']}({event['args']})"
                ).model_dump())
            elif event["type"] == "content":
                final_prediction_text += event["text"]
                await websocket.send_json(WSPartialResult(
                    agent="ChiefPredictor",
                    content=event["text"]
                ).model_dump())

        await websocket.send_json(WSResponse(
            prediction=final_prediction_text,
            agent_reports=reports
        ).model_dump())

    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        await websocket.send_json({"type": "error", "message": str(e)})
    finally:
        await websocket.close()
