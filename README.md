# RobCode | EdTech Coding Sandbox & STEM Lesson Dashboard

**RobCode** is a full-stack educational web application designed for K-12 students and educators. It bridges the gap between software development and robotics/STEM education by providing an interactive coding playground, gamified learning modules, and a comprehensive educator analytics dashboard.

---

## 🚀 Key Features

* **Interactive Coding Sandbox:** An integrated code editor environment allowing students to write, test, and execute beginner-friendly code snippets with instant feedback.
* **Student Learning Paths:** Gamified step-by-step programming and robotics logic lessons covering fundamental computer science concepts (variables, loops, conditionals).
* **Teacher & Admin Dashboard:** A dedicated educator portal to monitor class progress, review student code submissions, and design custom puzzles or curriculum modules.
* **Role-Based Access Control:** Secure authentication routing distinguishing between student and instructor privileges.

---

## 🛠️ Technologies Used

### Frontend (`/client`)
* **React.js (with Vite):** Fast, component-based user interface library.
* **Tailwind CSS:** Modern utility-first CSS framework for a responsive, accessible, and kid-friendly design.
* **Monaco Editor / Blockly Integration:** Code editor components for syntax highlighting and visual block-based logic.

### Backend (`/server`)
* **Node.js:** JavaScript runtime environment for scalable server-side execution.
* **Express.js:** Fast and minimalist web framework for building RESTful APIs.
* **JSON Web Tokens (JWT) & bcrypt:** Secure user authentication and password hashing.

### Database & Storage
* **MongoDB & Mongoose:** NoSQL document database and ODM for managing user profiles, lesson contents, and submission histories.

### Version Control & Deployment
* **Git & GitHub:** Source code management and repository hosting.
* **Vercel / Netlify:** High-performance frontend hosting.
* **Render / Railway:** Cloud platform hosting for the Node.js backend API.

---

## 📁 Project Architecture (Monorepo Structure)

```text
robcode-with-me/
├── client/                      # Frontend (React.js + Tailwind CSS)
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, CodeEditor)
│   │   ├── pages/               # Main views (Login, StudentView, TeacherView)
│   │   ├── services/            # API communication handlers
│   │   └── App.jsx              # Main router configuration
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                      # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/              # Database configuration
│   │   ├── controllers/         # Request handling logic (Auth, Lessons, Code)
│   │   ├── middleware/          # Auth verification & role checks
│   │   ├── models/              # Mongoose schemas (User, Lesson, Submission)
│   │   ├── routes/              # Express API endpoints
│   │   └── server.js            # Express application entry point
│   └── package.json
│
├── .gitignore                   # Ignored files (node_modules, .env, dist)
└── README.md                    # Project documentation
```
⚙️ Getting Started & Local Installation
Follow these instructions to set up the project locally on your machine.

Prerequisites
Node.js (v18 or higher recommended) installed on your system.

MongoDB (Local instance or MongoDB Atlas cloud cluster URI).

1. Clone the Repository
Bash
git clone [https://github.com/alcck/robcode-with-me.git](https://github.com/alcck/robcode-with-me.git)
cd robcode-with-me
2. Set Up the Backend
Bash
cd server
npm install
Create a .env file inside the server/ folder and add your configuration:

Plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key
Start the development server:

Bash
npm run dev
3. Set Up the Frontend
Open a new terminal window, navigate to the client folder, install dependencies, and launch:

Bash
cd client
npm install
npm run dev
Open your browser and navigate to the local URL provided by Vite (typically http://localhost:5173).

👩‍💻 Author
Almina Gökçe Çiçek

Junior Software Engineer & Robotics Educator

GitHub Profile
