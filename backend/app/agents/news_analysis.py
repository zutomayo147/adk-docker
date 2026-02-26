import requests
from bs4 import BeautifulSoup
from google.adk import Agent, Runner
from google.adk.tools import BaseTool

class NewsSearchTool(BaseTool):
    """株価に影響を与えるニュースを検索・取得するツール"""
    def __init__(self):
        super().__init__(
            name="news_search_tool",
            description="株価に影響を与えるニュースを検索・取得します。"
        )

    def execute(self, query: str = "日経平均 株価 ニュース"):
        # 簡易的なニュースサイトスクレイピング (例としてYahoo ニュース等の見出し)
        url = f"https://news.yahoo.co.jp/search?p={query}&ei=utf-8"
        headers = {"User-Agent": "Mozilla/5.0"}
        
        try:
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            news_items = []
            for item in soup.select('.sc-dlfmzB.sc-iLVFrd.bCebVj.jZcghl.newsFeed_item_link')[:5]:
                title = item.select_one('.sc-jHOnlo.iUjGNo.newsFeed_item_title').text
                news_items.append(title)
            
            if not news_items:
                return "現在、特筆すべきニュースは見つかりませんでした。"
            return news_items
        except Exception as e:
            return f"ニュース取得中にエラーが発生しました: {str(e)}"

def get_news_analysis_agent():
    return Agent(
        model="gemini-2.0-flash-001", name="NewsAnalysisAgent",
        instruction="""あなたはプロの金融ニュースアナリストです。
最新のニュース見出しを収集し、それが日経平均株価に対してポジティブ（強気）かネガティブ（弱気）かを分析してください。
ニュースの内容から市場のセンチメントを読み解き報告してください。""",
        tools=[NewsSearchTool()]
    )
