import atexit
import json
import logging
import os
import tempfile
from typing import Optional

logger = logging.getLogger(__name__)

def setup_google_credentials() -> Optional[str]:
    """
    環境変数からサービスアカウント情報を読み込み、GOOGLE_APPLICATION_CREDENTIALS を設定します。
    
    1. GOOGLE_SERVICE_ACCOUNT_JSON が JSON文字列なら、一時ファイルに書き出してそのパスを返します。
    2. GOOGLE_SERVICE_ACCOUNT_JSON が 既存のファイルパス（絶対・相対）なら、そのパス（絶対パス化）を返します。
    3. GOOGLE_APPLICATION_CREDENTIALS (ファイルパス) が既にあれば、そのパスを返します。
    """
    # 1 & 2. GOOGLE_SERVICE_ACCOUNT_JSON のチェック
    service_account_val = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if service_account_val:
        # まずはJSON文字列として試行
        try:
            json_data = json.loads(service_account_val)
            temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False)
            json.dump(json_data, temp_file)
            temp_file.close()
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_file.name
            atexit.register(lambda path=temp_file.name: os.unlink(path) if os.path.exists(path) else None)
            return temp_file.name
        except json.JSONDecodeError:
            # JSONでない場合は、ファイルパスとして試行
            # 相対パスの場合は絶対パスに解決
            full_path = os.path.abspath(service_account_val)
            if os.path.exists(full_path):
                os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = full_path
                return full_path
            else:
                logger.warning("GOOGLE_SERVICE_ACCOUNT_JSON is neither valid JSON nor an existing file path.")
    
    # 2. 既存のファイルパスのチェック
    credentials_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if credentials_path and os.path.exists(credentials_path):
        return credentials_path
        
    return None
