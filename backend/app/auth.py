import os
import json
import tempfile
from typing import Optional

def setup_google_credentials() -> Optional[str]:
    """
    環境変数からサービスアカウント情報を読み込み、GOOGLE_APPLICATION_CREDENTIALS を設定します。
    
    1. GOOGLE_SERVICE_ACCOUNT_JSON (JSON文字列) があれば、一時ファイルに書き出してそのパスを返します。
    2. GOOGLE_APPLICATION_CREDENTIALS (ファイルパス) が既にあれば、そのパスを返します。
    """
    # 1. JSON文字列のチェック
    service_account_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if service_account_json:
        try:
            # JSONとして妥当か検証
            json_data = json.loads(service_account_json)
            
            # 一時ファイルの作成 (削除されないように delete=False にするケースもあるが、
            # プロセス実行中のみ有効であればよい)
            temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False)
            json.dump(json_data, temp_file)
            temp_file.close()
            
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_file.name
            return temp_file.name
        except json.JSONDecodeError:
            print("Error: GOOGLE_SERVICE_ACCOUNT_JSON is not a valid JSON string.")
    
    # 2. 既存のファイルパスのチェック
    credentials_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if credentials_path and os.path.exists(credentials_path):
        return credentials_path
        
    return None
