import sys
import os
import argparse

# backend ディレクトリをパスに追加（コンテナ内実行を想定）
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.auth import setup_google_credentials
from app.runner import run_agent_task
from app.agents.market_data import get_market_data_agent
from app.agents.news_analysis import get_news_analysis_agent
from app.agents.technical_analysis import get_technical_analysis_agent
from app.agents.economic_sentiment import get_economic_sentiment_agent
from app.agents.chief_predictor import get_chief_predictor_agent
from google.adk.sessions import InMemorySessionService


def run_prediction(custom_prompt: str = None):
    # Google Cloud 認証情報のセットアップ
    setup_google_credentials()

    print("--- Agents Initializing ---")
    market_agent = get_market_data_agent()
    news_agent = get_news_analysis_agent()
    tech_agent = get_technical_analysis_agent()
    econ_agent = get_economic_sentiment_agent()
    chief_agent = get_chief_predictor_agent()

    session_service = InMemorySessionService()

    print("--- Data Gathering ---")
    print("Collecting Market Data...")
    market_text = run_agent_task(
        market_agent, "現在の日経平均(^N225)と関連指数、ドル円のデータを報告して",
        session_service, user_id="cli_user", session_id="cli_session",
    )

    print("Analyzing News...")
    news_text = run_agent_task(
        news_agent, "日経平均に関連する最新ニュースとセンチメントを報告して",
        session_service, user_id="cli_user", session_id="cli_session",
    )

    print("Technical Analysis...")
    tech_text = run_agent_task(
        tech_agent, "日経平均(^N225)のテクニカル指標とシグナルを分析して",
        session_service, user_id="cli_user", session_id="cli_session",
    )

    print("Economic Sentiment...")
    econ_text = run_agent_task(
        econ_agent, "現在の世界経済状況と日経平均への影響をマクロ視点で分析して",
        session_service, user_id="cli_user", session_id="cli_session",
    )

    print("--- Final Prediction by Chief Predictor ---")
    if custom_prompt:
        final_input = f"{custom_prompt}\n\n[Reports gathered from subordinates...]"
    else:
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

    final_prediction_text = run_agent_task(
        chief_agent, final_input,
        session_service, user_id="cli_user", session_id="cli_session",
    )

    print("\n==========================================")
    print("FINAL PREDICTION")
    print("==========================================")
    print(final_prediction_text)
    print("==========================================\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run Nikkei Predictor Agents from CLI")
    parser.add_argument("--prompt", type=str, help="Custom prompt for the Chief Predictor")

    args = parser.parse_args()

    try:
        run_prediction(args.prompt)
    except Exception as e:
        print(f"Error occurred: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
