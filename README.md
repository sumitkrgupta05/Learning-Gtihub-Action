# ⚡ Learning GitHub Actions: Automated CI/CD & Live Deployment

[![CI/CD Pipeline](https://github.com/sumitkrgupta05/Learning-Gtihub-Action/actions/workflows/ci.yml/badge.svg)](https://github.com/sumitkrgupta05/Learning-Gtihub-Action/actions/workflows/ci.yml)
[![Live Deployment](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://sumitkrgupta05.github.io/Learning-Gtihub-Action/)
[![Node.js](https://img.shields.io/badge/Node.js-18%20%7C%2020%20%7C%2022-blue?logo=node.js)](https://nodejs.org/)

A lightweight, zero-dependency Node.js project demonstrating a production-grade **Continuous Integration and Continuous Deployment (CI/CD)** pipeline built with **GitHub Actions** and deployed automatically to **GitHub Pages**.

---

## 🌐 Live Production Website
Every commit pushed or merged into `main` automatically tests, builds, and deploys to:
👉 **[https://sumitkrgupta05.github.io/Learning-Gtihub-Action/](https://sumitkrgupta05.github.io/Learning-Gtihub-Action/)**

---

## 🚀 Autonomous CI/CD Pipeline Architecture

```
                 git push origin main
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│  STAGE 1: Continuous Integration (CI) - Automated Tests│
│  Matrix: Node 18.x | Node 20.x | Node 22.x             │
│  - Clones repository (actions/checkout@v4)             │
│  - Configures Node runtime (actions/setup-node@v4)     │
│  - Executes unit tests (npm test)                      │
│  - Verifies CLI entry point (npm start)                │
└─────────────────────────┬──────────────────────────────┘
                          │ (All 3 matrix jobs pass ✅)
                          ▼
┌────────────────────────────────────────────────────────┐
│  STAGE 2: Build Web Application                        │
│  - Runs on ubuntu-latest with Node.js 20               │
│  - Generates web bundle & metadata in dist/            │
│  - Packages Pages artifact (actions/upload-pages)      │
└─────────────────────────┬──────────────────────────────┘
                          │ (Build succeeds ✅)
                          ▼
┌────────────────────────────────────────────────────────┐
│  STAGE 3: Continuous Deployment (CD) - Deploy Pages    │
│  - Deploys bundle to GitHub Pages (actions/deploy-pages)│
│  - Environment: github-pages                           │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
        🌐 Live URL is updated automatically!
```

---

## 📁 Repository Structure

```
Learning-Gtihub-Action/
│
├── .github/
│   └── workflows/
│       └── ci.yml                 # 3-stage CI/CD pipeline (Test -> Build -> Deploy)
│
├── public/
│   └── index.html                 # Interactive web dashboard (calculator & CI status)
│
├── scripts/
│   └── build.js                   # Compiles assets & injects metadata into dist/
│
├── src/
│   ├── index.js                   # Application CLI entry point
│   └── math.js                    # Arithmetic business logic (add, subtract, etc.)
│
├── test/
│   └── math.test.js               # Unit tests using native Node.js test runner
│
├── docs/
│   ├── complete-walkthrough.md    # Full project walkthrough & setup guide
│   ├── complete-walkthrough.html  # Styled walkthrough page with section navbar
│   ├── github-actions-guide.md    # In-depth GitHub Actions reference handbook
│   ├── github-actions-guide.html  # Offline styled HTML version of the guide
│   └── project-overview.md        # Architecture overview & design decisions
│
├── .gitignore                     # Excludes node_modules/, dist/, logs
├── package.json                   # Project metadata and scripts ("test", "build", "start")
└── README.md                      # Repository landing page
```

---

## 💻 How to Run & Test on Your Local PC

This repository requires **zero external npm packages**—it uses Node 18+'s native test runner!

### 1. Clone the repository
```bash
git clone https://github.com/sumitkrgupta05/Learning-Gtihub-Action.git
cd Learning-Gtihub-Action
```

### 2. Run the unit tests
```bash
npm test
```

### 3. Run the CLI application
```bash
npm start
```

### 4. Build the production website
```bash
npm run build
```
This generates the `dist/` directory containing the bundled web app, build metadata, and offline documentation.

---

## 🧪 Testing the Autonomous CI/CD Loop

### 1. Manual Workflow Execution
1. Open the [Actions Tab](https://github.com/sumitkrgupta05/Learning-Gtihub-Action/actions).
2. Select **"CI/CD Pipeline"** on the left menu.
3. Click **"Run workflow"** ➔ choose branch `main` ➔ click the green button.

### 2. Automatic Push Execution
1. Make an edit to `public/index.html` or `src/math.js`.
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update web dashboard title"
   git push origin main
   ```
3. Watch GitHub Actions test across Node versions, build the web app, and deploy the updated site in ~30 seconds.

### 3. Safety Gate Verification (Failing Test)
1. Intentionally change a test in `test/math.test.js` to fail (e.g., assert `2 + 3 == 999`).
2. Push to a branch or open a Pull Request.
3. Notice how GitHub Actions blocks the build and deploy jobs, keeping the live production website 100% bug-free.

---

## 📚 Documentation Index

| Document | Format | Description |
| :--- | :--- | :--- |
| **Complete Walkthrough** | [Markdown](docs/complete-walkthrough.md) \| [HTML](docs/complete-walkthrough.html) | Full step-by-step project journey, architecture, and manual guides. |
| **GitHub Actions Guide** | [Markdown](docs/github-actions-guide.md) \| [HTML](docs/github-actions-guide.html) | Comprehensive handbook: terms, syntax cheat sheets, and best practices. |
| **Project Overview** | [Markdown](docs/project-overview.md) | Technical overview of the Node.js setup and testing methodology. |
