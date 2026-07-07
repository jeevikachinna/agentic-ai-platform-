# 🤖 Agentic AI Platform

### An Agentic AI Platform for Everyday Productivity and Intelligent Task Automation

Everyday productivity, reimagined. A single website where users can ask for help with daily tasks, and dedicated AI agents handle the request — not a chatbot, but a **multi-agent AI platform**.

---

## 📖 Table of Contents

- [🤖 Agentic AI Platform](#-agentic-ai-platform)
    - [An Agentic AI Platform for Everyday Productivity and Intelligent Task Automation](#an-agentic-ai-platform-for-everyday-productivity-and-intelligent-task-automation)
  - [📖 Table of Contents](#-table-of-contents)
  - [🎯 Project Objective](#-project-objective)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [📁 Project Structure](#-project-structure)
  - [🏗 Architecture](#-architecture)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Clone the repository](#clone-the-repository)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [🔑 Environment Variables](#-environment-variables)
  - [☁️ Deployment](#️-deployment)
  - [🔌 API Endpoints (Backend)](#-api-endpoints-backend)
  - [📝 Known Issues / Notes](#-known-issues--notes)
  - [🗺 Roadmap](#-roadmap)
  - [👩‍💻 Author](#-author)

---

## 🎯 Project Objective

A single website that provides AI assistance for daily productivity tasks. A user submits a request, and the AI understands it and executes the correct task automatically.

Each feature is powered by its own dedicated agent/service connected to the Google Gemini API — this is what makes it **agentic** rather than a single general-purpose chatbot.

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 AI Chat Assistant | General-purpose conversational assistant with markdown-formatted responses |
| ✉️ Email Writer | Generates professional emails from a short prompt |
| 📄 PDF Assistant | Summarizes pasted document text, extracts insights, answers questions |
| 🌐 Translator | Translates text into multiple languages (French, Spanish, Hindi, Tamil, German, Japanese) |
| 📅 Planner | Creates study/work plans and schedules |
| 📊 Real-time Activity Dashboard | Tracks usage/activity across features |
| 🔐 Authentication | Login/Signup with JWT-based security |

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite)
- HTML, CSS, JavaScript
- `react-markdown` for formatted AI responses

**Backend**
- Java 17
- Spring Boot 3.3.1
- Spring Security (JWT-based auth)
- Spring WebFlux (WebClient for calling Gemini API)

**Database**
- H2 (in-memory)

**AI**
- Google Gemini API (`gemini-1.5-flash`)

**Deployment**
- Docker (backend, deployed on Render)
- Node/Vite static build (frontend, deployed on Render)

---

## 📁 Project Structure

```
AI agent/
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/aiagent/platform/
│       ├── AiAgentApplication.java
│       ├── config/              # AiClientConfig, CorsConfig, SecurityConfig
│       ├── controller/          # AuthController, ChatController, EmailController,
│       │                        # PdfController, PlannerController, TranslatorController,
│       │                        # StatsController
│       ├── dto/                 # ChatRequestDTO, ChatResponseDTO, UserDTO
│       ├── exception/           # CustomException, GlobalExceptionHandler
│       ├── model/                # ActivityLog, ChatMessage, Task, User
│       ├── repository/          # ActivityLogRepository, ChatRepository,
│       │                        # TaskRepository, UserRepository
│       ├── security/             # JwtFilter, JwtUtil
│       └── service/              # AiAgentService, AuthService, ChatService,
│                                  # GeminiCompletionService(Impl), PdfService
│
└── frontend/
    └── src/
        └── pages/
            ├── Chat.jsx
            ├── EmailWriter.jsx
            ├── Home.jsx
            ├── PdfAssistant.jsx
            ├── Planner.jsx
            ├── Translator.jsx
            └── Settings.jsx
```

---

## 🏗 Architecture

```
 ┌─────────────┐        HTTPS         ┌──────────────────┐        HTTPS        ┌───────────────┐
 │   React     │  ───────────────▶   │   Spring Boot     │  ─────────────▶   │  Gemini API    │
 │  Frontend   │  ◀───────────────   │   Backend (REST)  │  ◀─────────────   │  (Google AI)   │
 └─────────────┘                     └──────────────────┘                    └───────────────┘
   Render (Node)                       Render (Docker)                        Google Cloud
```

Each feature (Chat, Translator, Email Writer, PDF Assistant, Planner) has its own controller and calls a shared Gemini service layer, keeping agent logic modular and independently extensible.

---

## 🚀 Getting Started

### Prerequisites
- Java 17+ (JDK)
- Maven
- Node.js & npm
- A Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Clone the repository
```bash
git clone https://github.com/jeevikachinna/agentic-ai-platform-.git
cd agentic-ai-platform-
```

### Backend Setup
```bash
cd backend
# Add your Gemini API key in src/main/resources/application.properties:
# gemini.api.key=YOUR_API_KEY_HERE
mvn spring-boot:run
```
Runs at: `http://localhost:8080`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at: `http://localhost:3000`

---

## 🔑 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GEMINI_API_KEY` | Backend | Google Gemini API key used for all AI features |

Set locally in `backend/src/main/resources/application.properties`:
```properties
gemini.api.key=${GEMINI_API_KEY}
```

Set on Render under **Environment → Environment Variables** for the backend service.

---

## ☁️ Deployment

The app is deployed as **two separate Render services**:

| Service | Runtime | Purpose |
|---|---|---|
| `agentic-ai-platform-` | Node | Frontend (Vite build, served via `vite preview`) |
| `agentic-ai-platform--1` | Docker | Backend (Spring Boot, built via multi-stage Dockerfile) |

**Live URLs:**
- Frontend: `https://agentic-ai-platform-xz3f.onrender.com`
- Backend: `https://agentic-ai-platform-1-wh0u.onrender.com`

> ⚠️ Render's free tier does not support Java natively — the backend is deployed using a **Dockerfile** (Maven build stage + JRE run stage).

> ⚠️ Free tier services spin down after inactivity. The first request after idle time can take 30–60 seconds while the instance wakes up.

---

## 🔌 API Endpoints (Backend)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/signup` | User signup |
| POST | `/api/chat/send` | Send a chat message to the AI assistant |
| POST | `/api/translator/translate` | Translate text to a target language |
| POST | `/api/email/generate` | Generate an email from a prompt |
| POST | `/api/pdf/summarize` | Summarize pasted document text |
| POST | `/api/planner/generate` | Generate a study/work plan |

*(Confirm exact paths against your controller `@RequestMapping` annotations — update this table if any differ.)*

---

## 📝 Known Issues / Notes

- Google Gemini free tier has a **daily request quota per project** (not per key). If a feature suddenly stops working with no clear error, check quota first before assuming a code bug.
- Occasional `503 Service Unavailable` errors from Gemini ("model is currently experiencing high demand") are temporary server-side issues on Google's end — retry after a minute.
- Frontend must always point to the **deployed backend URL**, not `localhost`, when running in production.

---

## 🗺 Roadmap

- [ ] Move from H2 (in-memory) to a persistent database (MongoDB / PostgreSQL)
- [ ] Add Vector DB (ChromaDB / Qdrant) for document-aware Q&A
- [ ] Add file upload support for PDF Assistant (instead of paste-only)
- [ ] Improve chat UX (streaming responses, markdown rendering polish)
- [ ] Add automated tests for controllers and services
- [ ] Clean up committed build artifacts (`target/`) from version control

---

## 👩‍💻 Author

**Jeevika Chinnathambi**