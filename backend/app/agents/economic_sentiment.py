from google.adk import Agent, Runner

def get_economic_sentiment_agent():
    return Agent(
        model="gemini-2.0-flash-001", name="EconomicSentimentAgent",
        instruction="""あなたはマクロ経済学者です。
米国の雇用統計、CPI、FOMCの金利政策、また日本の金融政策決定会合の結果などが日経平均に与える影響を分析します。
現在の世界経済の状況（インフレ、リセッション懸念など）を踏まえた長期的な展望を提供してください。
最新の公開情報を知識として持ち合わせている前提で分析を行ってください。"""
    )
