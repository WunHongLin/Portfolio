from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# router
from app.api.Awards import router as awards_router
from app.api.Certificates import router as certificate_router
from app.api.Projects import router as project_router
from app.api.contact import router as contact_message_router

app = FastAPI(
    title="個人部落格後端",
    description="個人部落格後端",
    version="0.1.0"
)

origins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    settings.frontend_url.rstrip("/"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(awards_router)
app.include_router(certificate_router)
app.include_router(project_router)
app.include_router(contact_message_router)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "sucess",
        "status": "root"
    }