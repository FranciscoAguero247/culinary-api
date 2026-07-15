# CulinaryAPI 🍳

A modern, responsive, full-stack application that transforms elite, five-star culinary techniques into simplified, step-by-step instructions optimized for mobile devices and PCs. Powered by Google's Gemini LLM.

**Live Demo:** [https://culinary-api-frontend.onrender.com/](https://culinary-api-frontend.onrender.com/)  
**GitHub Repository:** [https://github.com/FranciscoAguero247/culinary-api](https://github.com/FranciscoAguero247/culinary-api)

---

## 🚀 Key Features

* **Michelin-Star AI Engine:** Uses the official `@google/genai` SDK configured with a system instruction block to generate precise, structured culinary protocols.
* **Structured JSON Schema Pipeline:** The backend forces Gemini to return strict, typed JSON, ensuring consistent rendering of recipe data without raw markdown artifacts.
* **Interactive UX Checklists:** Users can check off ingredients dynamically as they complete prep steps, preventing lost places on a busy kitchen counter.
* **Fully Responsive & Accessible:** Designed with mobile-first viewport scaling so cooks can easily view instruction cards from a phone or tablet.
* **Defensive Security Architecture:** Complete separation of concerns. The Gemini API Key is locked behind a Node.js gateway, safeguarding credentials from public client inspection.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
* **React 18** with **TypeScript** for predictable, type-safe UI building.
* **Vite** for optimized, high-performance module bundling.
* Clean, responsive, vanilla CSS layouts built for readability.

### Backend (Server)
* **Node.js** with **Express** & **TypeScript** (`ts-node-dev` in development).
* **Google Gen AI SDK (`@google/genai`)** interacting with the optimized `gemini-2.5-flash` model.
* **CORS** configuration to safely bridge cross-origin environments.

          ┌──────────────────────┐
          │   Vite + React UI    │  (Hosted on Render)
          └──────────┬───────────┘
                     │  POST /api/baking-assistant
                     ▼
          ┌──────────────────────┐
          │  Node.js + Express   │  (Hosted on Render)
          └──────────┬───────────┘
                     │  Official GenAI SDK
                     ▼
          ┌──────────────────────┐
          │ Google Gemini API    │  (API Key secured on Server)
          └──────────────────────┘

---

## ⚙️ Local Development Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* A **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
git clone https://github.com/FranciscoAguero247/culinary-api.git
cd culinary-api

### 2. Configure Backend Server
(Assuming your backend is in the server/ directory of your workspace)
Navigate into the server folder, install packages, and create your environment variables:

```
cd server
npm install
```
Create a ```.env file in the ```server directory:
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```
Run the local backend:

```
npm run dev
```
### 3. Configure Frontend Client
Open a second terminal, navigate into your client directory (```/client), install packages, and run Vite:
```
cd client
npm install
```
Create a ```.env file in the ```client directory to point to your local Express server:
```
VITE_API_BASE_URL=http://localhost:5000
```
Run the development server:
```
npm run dev
```
The application will run locally at http://localhost:5173, dynamically fetching secure data from your Express backend running at 
