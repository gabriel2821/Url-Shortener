from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse
import os

from app.core.database import get_db
from app.models.url import URL
from app.schemas.url import URLCreate, URLResponse
from app.utils.shortener import generate_short_code

router = APIRouter()
BASE_URL = os.getenv("BASE_URL")


@router.post("/shorten", response_model=URLResponse)
def shorten_url(data: URLCreate, db: Session = Depends(get_db)):
    #Prevent duplicate URLs
    original_url = str(data.original_url)
    existing = db.query(URL).filter(URL.original_url == original_url).first()
    if existing:
        return {"short_url": f"{BASE_URL}/{existing.short_code}"}

    #Handle short code collision
    while True:
        short_code = generate_short_code()
        if not db.query(URL).filter(URL.short_code == short_code).first():
            break

    url = URL(original_url=original_url, short_code=short_code)
    db.add(url)
    db.commit()
    db.refresh(url)

    return {"short_url": f"{BASE_URL}/{short_code}"}

@router.get("/{short_code}")
def redirect_url(short_code: str, db: Session = Depends(get_db)):
    url = db.query(URL).filter(URL.short_code == short_code).first()
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")

    return RedirectResponse(url.original_url)
    