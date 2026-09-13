# ⚔️ Life Arena

### Turn Real Life Into a Game. Complete Quests. Earn XP. Level Up.

**Life Arena** is a full-stack **MERN-based Life RPG** that transforms everyday tasks and personal goals into an engaging game-like experience.

Instead of a traditional to-do list, users complete **Quests**, earn **XP and Coins**, improve their **Character Attributes**, maintain **Streaks**, unlock **Achievements**, and build a persistent progression journey.

Live Website: https://life-arena.vercel.app/

---

## 🎯 Problem

Traditional productivity apps are mostly based on checkboxes:

**Create Task → Complete Task → Done**

Although useful, they often lack the instant feedback and motivation found in games.

Games keep users engaged through XP, levels, rewards, streaks, achievements, and visible progression.

**Life Arena brings these mechanics into real-life productivity.**

---

## 💡 Our Solution

Life Arena converts everyday activities into RPG-style quests.

For example:

- 💻 Solve DSA problems
- 📚 Study for an hour
- 🏋️ Complete a workout
- 🧘 Meditate
- 🚀 Work on a project

Completing quests rewards users with **XP, Coins, and Attribute Points**, allowing their character to grow over time.

```text
Real-Life Action
       ↓
     Quest
       ↓
   Complete
       ↓
XP + Coins + Attributes
       ↓
   Level Up
       ↓
 Achievements
```

The idea is simple:

> **Make personal growth feel like playing a game.**

---

## ✨ Core Features

### 🔐 Authentication & Security

Life Arena includes secure user authentication using **JWT and bcrypt**. Protected routes use authorization middleware to ensure users can access only their own data.

### ⚔️ Quest System

Users can create, view, edit, complete, and delete quests. Each quest can have its own difficulty, category, XP reward, Coin reward, and attribute reward.

### ⭐ XP & Level Progression

Completing quests gives XP and contributes toward the user's level progression, creating a clear sense of growth.

### 🧠 Character Attributes

Players develop attributes such as **Intelligence, Strength, Vitality, and Focus** based on the activities they complete.

### 🔥 Streaks

The application tracks consecutive activity to encourage consistency and help users build long-term habits.

### 🪙 Rewards & Shop

Users earn Coins by completing quests and can spend them on virtual items through the Life Arena Shop. Purchased items are stored in their personal inventory.

### 🏆 Achievements

Players can unlock milestones such as completing their first quest, completing multiple quests, reaching a specific level, or earning a certain amount of Coins.

### 📜 History

Important actions such as completed quests, rewards, purchases, and achievements are stored in a persistent activity history.

### 📊 Dashboard

The dashboard provides an overview of the player's level, XP, Coins, attributes, quests, streaks, and recent activity.

---

## 🏗️ MERN Stack

Life Arena is built using the **MERN Stack**:

- **MongoDB Atlas** — Database and persistent storage
- **Express.js** — Backend REST APIs
- **React.js** — Frontend user interface
- **Node.js** — Backend runtime

Additional technologies include **Mongoose, JWT, bcryptjs, React Router, Git, and Thunder Client**.

---

## 🗄️ Database Design

The application uses separate MongoDB models for different parts of the game:

**User** handles authentication and account information.

**Profile** stores level, XP, Coins, and character attributes.

**Quest** stores user-created quests and their rewards.

**History** stores important player activity.

**UserInventory** stores items purchased by each user.

**UserAchievement** stores achievements unlocked by each user.

All user-specific data is connected to the authenticated user, allowing each player to maintain their own independent progression.

---

## 📂 Project Structure

```text
iitfrontend/
│
├── dist/
│   ├── assets/
│   ├── index-CycuYLVu.js
│   └── index-YJgfFj3x.css
│  
│
├── Life_Arena/
│   │
│   └── backend/                         # BACKEND
│       │
│       ├── models/
│       │   ├── History.js
│       │   ├── Profile.js
│       │   ├── Quest.js
│       │   ├── User.js
│       │   ├── UserAchievement.js
│       │   └── UserInventory.js
│       │
│       ├── MW/
│       │   └── authMW.js
│       │
│       ├── routes/
│       │   ├── achievementRoutes.js
│       │   ├── authRoutes.js
│       │   ├── dashboardRoutes.js
│       │   ├── historyRoutes.js
│       │   ├── inventoryRoutes.js
│       │   ├── profileRoutes.js
│       │   └── questRoutes.js
│       │
│       ├── node_modules/
│       │
│       ├── .env
│       ├── index.js
│       ├── package.json
│       └── package-lock.json
│
│
├── src/                                  # FRONTEND
│   │
│   ├── components/
│   │   │
│   │   ├── achievements/
│   │   │   └── AchievementCard.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── ToastContainer.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── AttributeCard.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   ├── history/
│   │   │   └── HistoryItem.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   ├── quests/
│   │   │   ├── QuestCard.jsx
│   │   │   └── QuestModal.jsx
│   │   │
│   │   └── shop/
│   │       └── ShopCard.jsx
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── data/
│   │   ├── initialAchievements.js
│   │   ├── initialItems.js
│   │   └── sampleQuests.js
│   │
│   ├── pages/
│   │   ├── Achievements.jsx
│   │   ├── Dashboard.jsx
│   │   ├── History.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Quests.jsx
│   │   ├── Settings.jsx
│   │   ├── Shop.jsx
│   │   └── Signup.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   └── mockApi.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
│
├── node_modules/
├── public/
│
├── .gitignore
├── .oxlintrc.json
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.cjs
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

---

## 🔄 User Journey

```text
Sign Up
   ↓
Login
   ↓
Dashboard
   ↓
Create Quest
   ↓
Complete Quest
   ↓
Earn XP + Coins
   ↓
Improve Attributes
   ↓
Level Up
   ↓
Unlock Achievements
   ↓
Use Coins in Shop
   ↓
Progress Persists in MongoDB
```

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Life_Arena
```

Install and run the backend:

```bash
cd backend
npm install
node index.js
```

Install and run the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside `backend`:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🏆Our Hackathon Focus

Life Arena focuses on the core requirements of the challenge: **secure authentication, persistent database storage, CRUD functionality, RPG progression, streaks, attributes, rewards, achievements, and a responsive game-inspired UI.**
Live Website: https://life-arena.vercel.app/

Rather than building another generic productivity dashboard, Life Arena asks:

> **"What if improving your life actually felt like leveling up?"**

### ⚔️ Build Habits. Earn XP. Level Up Your Life.

##Demo Credentials 
If you want to explore the website and see how the features work, you can use the demo account below. The demo account already contains sample progress, levels, points, and quests so you can experience the application without starting from zero.

**Demo Username:**  lakshmi@123
**Demo Password:**  lakshmi@123

