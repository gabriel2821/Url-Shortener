# URL Shortener

A simple full-stack URL shortener built as a technical assessment.

Users can submit a long URL and receive a shortened version.  

---

## Features

- Shorten long URLs
- Redirect short URLs
- Prevent duplicate URLs
- Handle short code collisions
- URL validation
- REST API with FastAPI

---

## Tech Stack

**Backend**
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

**Frontend**
- React
- TypeScript
- Vite
- Shadcn Ui

---

## Project Structure

url-shortener/
├── Backend/
│ ├── app/
│ ├── venv/
│ ├── requirements.txt
│ └── .env
│
├── Frontend/
│ ├── src/
│ └── package.json
│
└── README.md


---

## How to Run Locally

### Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# backend runs at 
http://localhost:8000

# Api docs
http://localhost:8000/docs

#Frontend
cd Frontend
npm install
npm run dev

# frontend runs at 
http://localhost:5173

#API Endpoints
POST /shorten – Create a short URL
GET /{short_code} – Redirect to original URL


