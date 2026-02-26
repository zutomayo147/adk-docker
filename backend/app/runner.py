from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part


def run_agent_task(agent, message: str, session_service: InMemorySessionService, user_id: str = "app_user", session_id: str = "app_session") -> str:
    """エージェントを実行して最終的なテキスト回答を取得する共通ヘルパー。

    Args:
        agent: 実行するADKエージェント
        message: ユーザーへのプロンプトテキスト
        session_service: セッション管理サービス
        user_id: ユーザーID（デフォルト: "app_user"）
        session_id: セッションID（デフォルト: "app_session"）

    Returns:
        エージェントが生成したテキスト全文
    """
    runner = Runner(
        agent=agent,
        app_name="NikkeiPredictor",
        session_service=session_service,
        auto_create_session=True,
    )

    new_message = Content(role="user", parts=[Part(text=message)])

    events = runner.run(
        user_id=user_id,
        session_id=session_id,
        new_message=new_message,
    )

    full_text = ""
    for event in events:
        if event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text") and part.text:
                    full_text += part.text

    return full_text
