from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
from datetime import datetime
import os
import logging
import uuid
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Praveen's Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Models
class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# Portfolio data structure
PORTFOLIO_DATA = {
    "personal": {
        "name": "Praveen Chouthri",
        "tagline": "Aspiring Software Developer",
        "description": "Computer Science student passionate about creating user-centric, functional applications with a focus on accessibility and innovative technology solutions.",
        "email": "praveenchouthri@gmail.com",
        "phone": "+91 8220226734",
        "location": "Chennai, India",
        "linkedin": "https://linkedin.com/in/praveenchouthri",
        "github": "https://github.com/praveenchouthri"
    },
    "about": {
        "summary": "Currently pursuing BTech + MTech (Integrated) Dual Degree in Computer Science at IIITDM Kancheepuram with a GPA of 8.0/10.0. I'm a proactive developer with hands-on experience in web application development, specializing in Python, Flask, and database management. My passion lies in creating technology that prioritizes accessibility and delivers exceptional user experiences.",
        "yearsOfExperience": "Student with hands-on project experience",
        "focus": "Web Development & Database Management"
    },
    "skills": {
        "programming": ["Python", "C", "C++", "SQL", "HTML", "CSS", "JavaScript"],
        "frameworks": ["Flask", "SQLAlchemy", "NumPy", "Tkinter"],
        "tools": ["Git", "GitHub", "VS Code", "PyCharm"],
        "databases": ["MySQL"]
    },
    "projects": [
        {
            "id": 1,
            "title": "DriveWheelz",
            "subtitle": "Smart Vehicle Rental Web App",
            "description": "Comprehensive vehicle rental platform built with Python and Flask, featuring secure authentication, real-time availability checking, and robust database management.",
            "technologies": ["Python", "Flask", "MySQL", "SQLAlchemy"],
            "features": [
                "Secure user authentication system",
                "Dynamic vehicle catalog browsing",
                "Real-time availability checking with conflict resolution",
                "Efficient booking management system",
                "User profile customization",
                "Detailed rental history tracking"
            ],
            "liveLink": "https://drivewheelz.example.com",
            "status": "Live"
        }
    ],
    "education": [
        {
            "degree": "BTech + MTech (Integrated) Dual Degree",
            "field": "Computer Science",
            "institution": "Indian Institute of Information Technology Design & Manufacturing Kancheepuram",
            "duration": "Aug 2023 - Current",
            "gpa": "8.0/10.0"
        },
        {
            "degree": "Higher Secondary - CBSE",
            "institution": "Velammal Vidhyashram",
            "duration": "Apr 2021 - Mar 2023"
        }
    ],
    "certifications": [
        {
            "name": "SQL (Intermediate)",
            "issuer": "HackerRank",
            "category": "Database"
        },
        {
            "name": "Generative AI",
            "issuer": "LinkedIn Learning",
            "category": "AI/ML"
        },
        {
            "name": "GUI Development with Tkinter",
            "issuer": "Udemy",
            "category": "Development"
        },
        {
            "name": "Introduction to NumPy",
            "issuer": "Simplilearn",
            "category": "Data Science"
        },
        {
            "name": "UI/UX for Beginners",
            "issuer": "Great Learning",
            "category": "Design"
        }
    ]
}

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}

@api_router.get("/portfolio")
async def get_portfolio_data():
    """Get complete portfolio data"""
    try:
        logger.info("Portfolio data requested")
        return {
            "success": True,
            "data": PORTFOLIO_DATA
        }
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(inquiry: ContactInquiryCreate):
    """Submit contact form inquiry"""
    try:
        # Create contact inquiry object
        contact_data = ContactInquiry(**inquiry.dict())
        
        # Save to database
        result = await db.contact_inquiries.insert_one(contact_data.dict())
        
        if result.inserted_id:
            logger.info(f"New contact inquiry from {inquiry.email}")
            return ContactResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon.",
                id=contact_data.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save inquiry")
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        return ContactResponse(
            success=False,
            message="Sorry, there was an error sending your message. Please try again."
        )

@api_router.get("/admin/contacts")
async def get_contact_inquiries(limit: int = 50, skip: int = 0):
    """Get contact inquiries for admin (optional endpoint)"""
    try:
        inquiries = await db.contact_inquiries.find().sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)
        total = await db.contact_inquiries.count_documents({})
        
        return {
            "success": True,
            "data": inquiries,
            "total": total,
            "limit": limit,
            "skip": skip
        }
    except Exception as e:
        logger.error(f"Error fetching contact inquiries: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.utcnow()
        }

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
