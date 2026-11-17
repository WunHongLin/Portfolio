
from secrets import compare_digest

from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

from app.core.config import settings


admin_key_header = APIKeyHeader(
    name="X-Admin-Key",
    scheme_name="AdminApiKey",
    auto_error=False,
)


def require_admin(
    api_key: str | None = Security(admin_key_header),
) -> None:
    """驗證管理者 API Key。"""

    expected_key = settings.admin_api_key

    # 沒設定密鑰就拒絕管理操作
    if not expected_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin API key is not configured",
        )

    # 未提供或密鑰不正確
    if api_key is None or not compare_digest(
        api_key,
        expected_key,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin API key",
        )
