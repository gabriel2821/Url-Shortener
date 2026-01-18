from fastapi import FastAPI
from app.core.database import Base, engine
from app.routers import url
from fastapi.middleware.cors import CORSMiddleware

def create_app():
    app = FastAPI(title="URL Shortener")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5173", 
            "https://url-shortener-blush-phi.vercel.app"   
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    Base.metadata.create_all(bind=engine)
    app.include_router(url.router)

    return app

app = create_app()
