#  TRON - MERN Bug Tracking System

A **powerful full-stack MERN bug tracking web application** designed to help teams manage software bugs efficiently.  
It includes authentication, company-based user management, live chat for tickets, detailed analytics, and a clean modern UI with futuristic effects (like Tron-inspired glass design and Vanta.js fog).

---

##  Tech Stack

**Frontend:**
- React.js (with Hooks & Context)
- Fetch Api for API communication
- TailwindCSS + Glassmorphism design
- Vanta.js (Fog Effect)
- chartjs for analytics
- Socket.io-client for real-time chat

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io (for chat)
- dotenv for environment variables
- Multer for file sharing 

##  Features

###  Authentication & Company System
- Secure login/register with JWT & cookies
- Company creation and invite system
- Join company using emailed invite link
- Role-based access (Admin / Member)

###  Project & Ticket Management
- Create and manage multiple projects
- Add, assign, and track tickets per project
- Ticket statuses: Open, In Progress, Closed
- Real-time project & ticket analytics (Pie & Bar charts)
- Filter, search, and view tickets per project or globally

###  Real-time Chat (per Ticket)
- Live messaging using Socket.io
- Each ticket has its own chat thread
- Smooth, modern chat UI
- Supports text (and ready for file/image sharing in future updates)

###  Company Dashboard
- View total members, projects, and active tickets
- Modern glassmorphism UI
- Active stats cards and performance overview

###  Analytics Dashboard
- Pie charts for ticket status (Open, Closed, etc.)
- Bar chart for bug distribution across projects
- Dynamic data updates from backend

###  Responsive Design
- Dashboard tables for desktop
- Card layout for mobile users
- Smooth hover animations and transitions

###  Upcoming Features
-  Image & File sharing in chat  
-  Pagination for tickets & projects  
-  Email-based status notifications
-  Google sign_up for simplicity
