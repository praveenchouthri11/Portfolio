from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
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
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio

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

# Email Configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', 'your-email@gmail.com')  # Placeholder
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'your-app-password')      # Placeholder
FROM_EMAIL = os.environ.get('FROM_EMAIL', SMTP_USERNAME)
TO_EMAIL = 'praveenchouthri@gmail.com'  # Praveen's email

# Email service
class EmailService:
    @staticmethod
    async def send_contact_notification(contact_data: dict):
        """Send email notification to Praveen about new contact form submission"""
        try:
            # Email content for Praveen
            subject = f"New Portfolio Contact: {contact_data['subject']}"
            
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                            🎉 New Contact Form Submission
                        </h2>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1f2937;">Contact Details:</h3>
                            <p><strong>Name:</strong> {contact_data['name']}</p>
                            <p><strong>Email:</strong> <a href="mailto:{contact_data['email']}" style="color: #2563eb;">{contact_data['email']}</a></p>
                            <p><strong>Subject:</strong> {contact_data['subject']}</p>
                            <p><strong>Submitted:</strong> {contact_data['timestamp'].strftime('%B %d, %Y at %I:%M %p')}</p>
                        </div>
                        
                        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                            <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
                            <p style="white-space: pre-line; background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
{contact_data['message']}
                            </p>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 20px; background-color: #dbeafe; border-radius: 8px;">
                            <p style="margin: 0; text-align: center; color: #1e40af;">
                                <strong>Quick Reply:</strong> 
                                <a href="mailto:{contact_data['email']}?subject=Re: {contact_data['subject']}" 
                                   style="color: #2563eb; text-decoration: none; font-weight: bold;">
                                    Reply to {contact_data['name']} →
                                </a>
                            </p>
                        </div>
                        
                        <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                            <p>This email was sent from your portfolio contact form</p>
                            <p>Portfolio: <a href="http://localhost:3000" style="color: #2563eb;">View Live Site</a></p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Send email in background
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, EmailService._send_email, subject, html_body, TO_EMAIL)
            
            logger.info(f"Email notification sent to {TO_EMAIL} for contact from {contact_data['email']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {e}")
            return False
    
    @staticmethod
    async def send_auto_reply(contact_data: dict):
        """Send auto-reply confirmation to the person who submitted the form"""
        try:
            subject = f"Thanks for reaching out, {contact_data['name'].split()[0]}! 🎉"
            
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #2563eb; margin-bottom: 10px;">Thank You!</h1>
                            <p style="color: #6b7280; font-size: 18px;">Your message has been received</p>
                        </div>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p>Hi <strong>{contact_data['name']}</strong>,</p>
                            
                            <p>Thank you for reaching out through my portfolio! I've received your message about 
                            "<strong>{contact_data['subject']}</strong>" and I'm excited to connect with you.</p>
                            
                            <p><strong>What happens next?</strong></p>
                            <ul style="color: #4b5563;">
                                <li>I'll review your message within 24 hours</li>
                                <li>You'll receive a personal response within 2-3 business days</li>
                                <li>If it's urgent, feel free to call me at +91 8220226734</li>
                            </ul>
                        </div>
                        
                        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #1e40af;">Your Message Summary:</h3>
                            <p><strong>Subject:</strong> {contact_data['subject']}</p>
                            <p><strong>Submitted:</strong> {contact_data['timestamp'].strftime('%B %d, %Y at %I:%M %p')}</p>
                            <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 10px;">
                                <p style="margin: 0; white-space: pre-line; color: #4b5563;">
{contact_data['message'][:200]}{'...' if len(contact_data['message']) > 200 else ''}
                                </p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p style="color: #6b7280;">In the meantime, feel free to:</p>
                            <div style="margin-top: 15px;">
                                <a href="https://linkedin.com/in/praveenchouthri" style="color: #2563eb; text-decoration: none; margin: 0 10px;">📱 Connect on LinkedIn</a>
                                <a href="https://github.com/praveenchouthri" style="color: #2563eb; text-decoration: none; margin: 0 10px;">💻 Check my GitHub</a>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                            <p><strong>Praveen Chouthri</strong></p>
                            <p>Aspiring Software Developer | BTech + MTech at IIITDM Kancheepuram</p>
                            <p>📧 praveenchouthri@gmail.com | 📱 +91 8220226734 | 📍 Chennai, India</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Send auto-reply email
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, EmailService._send_email, subject, html_body, contact_data['email'])
            
            logger.info(f"Auto-reply sent to {contact_data['email']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send auto-reply: {e}")
            return False
    
    @staticmethod
    def _send_email(subject: str, html_body: str, to_email: str):
        """Send email using SMTP (runs in thread pool)"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = FROM_EMAIL
            msg['To'] = to_email
            
            # Attach HTML content
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
            
            # Send email
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()
                
                # Skip authentication if using placeholder credentials
                if SMTP_USERNAME != 'your-email@gmail.com' and SMTP_PASSWORD != 'your-app-password':
                    server.login(SMTP_USERNAME, SMTP_PASSWORD)
                    server.send_message(msg)
                    logger.info(f"Email sent successfully to {to_email}")
                else:
                    logger.warning(f"SMTP credentials not configured - email would be sent to {to_email}")
                    logger.info(f"Email preview - Subject: {subject}")
                    
        except Exception as e:
            logger.error(f"SMTP error: {e}")
            raise

# Models (same as before)
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
