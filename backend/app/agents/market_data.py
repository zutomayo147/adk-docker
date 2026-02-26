import yfinance as ticker
from google.adk import Agent, Runner
from google.adk.tools import BaseTool

class MarketDataTool(BaseTool):
    """日経平均株価や関連指数のデータを取得するツール"""
    def __init__(self):
        super().__init__(
            name="market_data_tool",
            description="日経平均株価(^N225)や関連指数のデータを取得します。"
        )

    def execute(self, symbol: str = "^N225"):
        data = ticker.download(symbol, period="5d", interval="1d")
        if data.empty:
            return f"Error: No data found for {symbol}"
        
        # 最新の終値と前日比を取得
        latest_price = float(data['Close'].iloc[-1])
        prev_price = float(data['Close'].iloc[-2])
        change = latest_price - prev_price
        change_pct = (change / prev_price) * 100
        
        return {
            "symbol": symbol,
            "latest_close": round(latest_price, 2),
            "change": round(change, 2),
            "change_percent": f"{change_pct:.2f}%",
            "history": data['Close'].tail(5).to_dict()
        }

def get_market_data_agent():
    return Agent(
        model="gemini-2.0-flash-001", name="MarketDataAgent",
        instruction="""あなたはプロの市場データアナリストです。
日経平均株価(^N225)、TOPIX、ドル円為替、S&P500などのデータを取得し、
現在の市場の数値を正確に報告してください。ツールを使用して実際のデータを確認してください。""",
        tools=[MarketDataTool()]
    )
