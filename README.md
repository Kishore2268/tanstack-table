# User Table Application

A modern, performant user table application built with React and Node.js, featuring infinite scroll, virtualization, and real-time search capabilities.

## 🚀 Features

- **Backend**
  - Express.js server with pagination
  - JSON file-based data fetching
  - Sorting and searching capabilities
  - Error handling and input validation

- **Frontend**
  - React with functional components and hooks
  - TanStack Table for table management
  - TanStack Virtual for efficient rendering
  - Infinite scroll with manual implementation
  - Real-time search with debouncing
  - Column sorting
  - Responsive design with Tailwind CSS

## 🛠️ Technical Stack

### Backend
- Node.js
- Express.js
- CORS for cross-origin requests

### Frontend
- React.js
- TanStack Table
- TanStack Virtual
- Tailwind CSS
- Axios for API requests

## 📦 Project Structure

```
├── backend/
│   ├── index.js         # Express server and API endpoints
│   ├── users.json       # User data
│   └── package.json     # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── hooks/       # Custom React hooks
    │   └── App.js       # Main application component
    └── package.json     # Frontend dependencies
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

3. Start the servers:
   ```bash
   # Backend (from backend directory)
   node index.js

   # Frontend (from frontend directory)
   npm start
   ```
