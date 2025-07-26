# Backend API Contracts & Integration Plan

## Overview
This document outlines the API contracts for Praveen's portfolio backend, current mock data structure, and integration plan.

## Current Mock Data Structure (frontend/src/mock.js)

### Personal Information
```javascript
personal: {
  name: "Praveen Chouthri",
  tagline: "Aspiring Software Developer", 
  description: "Computer Science student passionate about...",
  email: "praveenchouthri@gmail.com",
  phone: "+91 8220226734",
  location: "Chennai, India",
  linkedin: "https://linkedin.com/in/praveenchouthri",
  github: "https://github.com/praveenchouthri"
}
```

### Skills Data
```javascript
skills: {
  programming: ["Python", "C", "C++", "SQL", "HTML", "CSS", "JavaScript"],
  frameworks: ["Flask", "SQLAlchemy", "NumPy", "Tkinter"],
  tools: ["Git", "GitHub", "VS Code", "PyCharm"],
  databases: ["MySQL"]
}
```

### Projects Data
```javascript
projects: [{
  id: 1,
  title: "DriveWheelz",
  subtitle: "Smart Vehicle Rental Web App",
  description: "Comprehensive vehicle rental platform...",
  technologies: ["Python", "Flask", "MySQL", "SQLAlchemy"],
  features: ["Secure user authentication", "Dynamic vehicle catalog browsing", ...],
  liveLink: "https://drivewheelz.example.com",
  status: "Live"
}]
```

### Education Data
```javascript
education: [{
  degree: "BTech + MTech (Integrated) Dual Degree",
  field: "Computer Science",
  institution: "Indian Institute of Information Technology Design & Manufacturing Kancheepuram",
  duration: "Aug 2023 - Current",
  gpa: "8.0/10.0"
}]
```

### Certifications Data
```javascript
certifications: [{
  name: "SQL (Intermediate)",
  issuer: "HackerRank",
  category: "Database"
}]
```

## API Endpoints to Implement

### 1. Portfolio Data API
**GET /api/portfolio**
- Returns complete portfolio data (personal, skills, projects, education, certifications)
- Used to populate all sections of the portfolio

### 2. Contact Form API
**POST /api/contact**
- Accepts contact form submissions
- Stores inquiries in database
- Returns success/error response

**Request Body:**
```javascript
{
  name: "string",
  email: "string", 
  subject: "string",
  message: "string",
  timestamp: "datetime" // auto-generated
}
```

**Response:**
```javascript
{
  success: boolean,
  message: "string",
  id: "string" // inquiry ID
}
```

### 3. Admin Analytics (Optional)
**GET /api/admin/contacts**
- Returns all contact form submissions
- For viewing inquiries (if admin panel needed)

## Database Models

### ContactInquiry Model
```python
class ContactInquiry:
    id: str
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime
    status: str  # "new", "read", "responded"
```

### PortfolioData Model (Static)
```python
class PortfolioData:
    id: str
    personal: dict
    skills: dict
    projects: list
    education: list
    certifications: list
    last_updated: datetime
```

## Frontend Integration Plan

### Phase 1: Contact Form Integration
1. Replace mock form submission in `EnhancedContactSection.jsx`
2. Add API call to POST /api/contact
3. Handle success/error responses
4. Show proper feedback to users

### Phase 2: Portfolio Data Integration  
1. Create API service in `frontend/src/services/api.js`
2. Replace mock.js imports with API calls
3. Add loading states to components
4. Handle API errors gracefully

### Phase 3: Error Handling & Loading States
1. Add loading spinners/skeletons
2. Add error boundaries
3. Add retry mechanisms
4. Add offline fallbacks to mock data

## API Service Structure (Frontend)

```javascript
// frontend/src/services/api.js
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const portfolioAPI = {
  getPortfolioData: () => fetch(`${API_BASE}/portfolio`),
  submitContactForm: (formData) => fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
};
```

## Implementation Priority

1. **HIGH**: Contact form backend + frontend integration
2. **MEDIUM**: Portfolio data API (currently static from resume)
3. **LOW**: Admin panel for viewing contact inquiries

## Placeholder Notes

- Project images: Use gradient placeholders with project icons
- Social media links: Use provided LinkedIn/GitHub URLs
- Live project links: Use placeholder URLs until real ones available
- Profile images: Use initials or gradient avatars

## Testing Strategy

1. Test contact form submission with various inputs
2. Test API error scenarios (network failures, validation errors)
3. Test loading states and user feedback
4. Verify email notifications work (if implemented)

## Security Considerations

1. Input validation on all form fields
2. Rate limiting on contact form submissions
3. Email sanitization to prevent injection
4. CORS configuration for frontend domain
5. Environment variables for sensitive data