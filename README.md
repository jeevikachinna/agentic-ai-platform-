# Agentic AI Platform

**An Agentic AI Platform for Everyday Productivity and Intelligent Task Automation**

## Project Objective

A single website that provides AI assistance for daily productivity tasks. A user submits a request, and the AI understands it and executes the correct task automatically.

This is **not a chatbot** — it is a **multi-agent AI platform**, where each feature is handled by its own dedicated agent/service.

### Features

- ✉️ Write an email
- 📄 Summarize a PDF
- 🌐 Translate text
- 💻 Explain code
- 📝 Generate notes
- 📅 Create a study/work plan
- 📊 Analyze uploaded documents
- 💡 Brainstorm ideas

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- React

### Backend
- Spring Boot (Java)

### Database
- MongoDB
- Vector DB (ChromaDB or Qdrant)

### AI
- Google Gemini API

### Deployment
- Docker

## Project Structure

```
AI Agent/
├── backend/
│   └── src/main/java/com/aiagent/platform/
│       ├── controller/      # REST controllers (Translator, Email, PDF, Planner, etc.)
│       ├── service/         # Business logic, Gemini API calls
│       ├── model/           # Data models
│       ├── repository/      # MongoDB repositories
│       ├── dto/             # Request/response objects
│       ├── config/          # App configuration
│       ├── security/        # Auth & security config
│       └── exception/       # Custom exceptions
│
└── frontend/
    └── src/
        └── pages/           # React pages (Translator.jsx, Planner.jsx, etc.)
```

## Setup & Run

### Prerequisites
- Java 17+ / JDK
- Node.js & npm
- MongoDB running locally or via Atlas
- A Google Gemini API key

### Backend
```
cd backend
mvn spring-boot:run
```
Runs at: `https://agentic-ai-platform-1-wh0u.onrender.com`

### Frontend
```
cd frontend
npm install
npm run dev
```
Runs at: `https://agentic-ai-platform-1-wh0u.onrender.com`

### Configuration
Add your Gemini API key in `backend/src/main/resources/application.properties`:
```
gemini.api.key=YOUR_API_KEY_HERE
```

## Status

🚧 Work in progress — features being built and tested one at a time (Translator, Email Writer, PDF Assistant, Planner, Chat).

## Notes
- Google Gemini free tier has a daily request quota (per project). If a feature suddenly stops working with no clear error, check for quota limits first.
