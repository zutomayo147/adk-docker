from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
import asyncio


def run_agent_task(agent, message: str, session_service: InMemorySessionService, user_id: str = "app_user", session_id: str = "app_session") -> str:
    """エージェントを実行して最終的なテキスト回答を取得する共通ヘルパー。"""
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


async def run_agent_task_stream(agent, message: str, session_service: InMemorySessionService, user_id: str = "app_user", session_id: str = "app_session"):
    """エージェントを実行し、イベントを非同期ストリームとしてyieldする。"""
    runner = Runner(
        agent=agent,
        app_name="NikkeiPredictor",
        session_service=session_service,
        auto_create_session=True,
    )

    new_message = Content(role="user", parts=[Part(text=message)])

    # runner.run() はイテレータを返すが、内部でモデル呼び出し（I/O）を行う可能性があるため、
    # asyncio.to_thread で非同期化、あるいは単にイテレーションを非同期に行う。
    # ここでは ADK のイテレータを非同期に回す。
    
    events = await asyncio.to_thread(
        runner.run,
        user_id=user_id,
        session_id=session_id,
        new_message=new_message
    )

    full_text = ""
    for event in events:
        # 思考プロセスやツール情報のイベントを yield
        if event.tool_call:
            yield {"type": "tool_call", "name": event.tool_call.inner.name, "args": event.tool_call.inner.args}
        
        if event.tool_response:
            yield {"type": "tool_response", "status": "success"}

        if event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text") and part.text:
                    full_text += part.text
                    yield {"type": "content", "text": part.text}
        
        # モデル呼び出し（thinking/generation）の合間に制御を戻す
        await asyncio.sleep(0)

    yield {"type": "final_text", "text": full_text}
