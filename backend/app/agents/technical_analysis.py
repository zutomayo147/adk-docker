import yfinance as ticker
import pandas as pd
from google.adk import Agent, Runner
from google.adk.tools import BaseTool

class TechnicalAnalysisTool(BaseTool):
    """テクニカル指標を計算するツール"""
    def execute(self, symbol: str = "^N225"):
        data = ticker.download(symbol, period="1mo", interval="1d")
        if len(data) < 20:
            return "指標計算に必要なデータが不足しています。"
        
        # 移動平均線 (SMA5, SMA20)
        data['SMA5'] = data['Close'].rolling(window=5).mean()
        data['SMA20'] = data['Close'].rolling(window=20).mean()
        
        latest = data.iloc[-1]
        prev = data.iloc[-2]
        
        # ゴールデンクロス/デッドクロス判定
        cross_signal = "Neutral"
        if prev['SMA5'] < prev['SMA20'] and latest['SMA5'] > latest['SMA20']:
            cross_signal = "Golden Cross (Strong Buy)"
        elif prev['SMA5'] > prev['SMA20'] and latest['SMA5'] < latest['SMA20']:
            cross_signal = "Dead Cross (Strong Sell)"
        
        return {
            "symbol": symbol,
            "SMA5": round(float(latest['SMA5']), 2),
            "SMA20": round(float(latest['SMA20']), 2),
            "signal": cross_signal,
            "current_price": round(float(latest['Close']), 2)
        }

def get_technical_analysis_agent():
    return Agent(
        name="TechnicalAnalysisAgent",
        instructions="""あなたは経験豊富なテクニカルアナリストです。
移動平均線や出来高などのテクニカル指標を分析し、チャートのトレンド（上昇・下降・横ばい）を判断してください。
投資家の心理状態や過熱感を指標から読み取ってください。""",
        tools=[TechnicalAnalysisTool()]
    )
