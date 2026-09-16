# Complete Project Walkthrough: Node.js CI/CD with GitHub Actions & Pages

Welcome to the complete project walkthrough! This document details everything that has been implemented in this repository, from initial setup to autonomous multi-stage CI/CD deployment, bug resolution, and instructions for testing both locally and in the cloud.

---

## 📑 Table of Contents
1. [Executive Summary & What We Built](#1-executive-summary--what-we-built)
2. [Step-by-Step Evolution of the Project](#2-step-by-step-evolution-of-the-project)
3. [How the Autonomous CI/CD Pipeline Operates](#3-how-the-autonomous-cicd-pipeline-operates)
4. [How Any User Can Test This on Their PC](#4-how-any-user-can-test-this-on-their-pc)
5. [Manual Testing Workflows](#5-manual-testing-workflows)
6. [Observing Autonomous Execution on GitHub](#6-observing-autonomous-execution-on-github)

---

## 1. Executive Summary & What We Built

In this repository, we transformed an empty project into a complete, automated **Continuous Integration and Continuous Deployment (CI/CD)** system:

- **Core Application**: A lightweight, zero-dependency Node.js arithmetic module (`src/math.js`) and entry point (`src/index.js`).
- **Automated Unit Tests**: Native Node.js test suite (`test/math.test.js`) testing all edge cases and assertions.
- **Production Build System**: A build script (`scripts/build.js`) that packages static web assets, generates dynamic build metadata (`build-info.json`), and copies documentation into `dist/`.
- **Live Interactive Web App**: A frontend dashboard (`public/index.html`) featuring an interactive browser calculator, visual pipeline status, and deployment metadata.
- **Autonomous CI/CD Pipeline**: A 3-stage GitHub Actions workflow (`.github/workflows/ci.yml`) that triggers on every push to `main` and Pull Request:
  1. **Stage 1 (Test)**: Runs tests in parallel across Node.js 18.x, 20.x, and 22.x on Ubuntu virtual machines.
  2. **Stage 2 (Build)**: Compiles the production bundle and generates GitHub Pages artifacts.
  3. **Stage 3 (Deploy)**: Automatically publishes the site to GitHub Pages with zero manual intervention.
- **Live Deployment URL**: [https://sumitkrgupta05.github.io/Learning-Gtihub-Action/](https://sumitkrgupta05.github.io/Learning-Gtihub-Action/)

---

## 2. Step-by-Step Evolution of the Project

Here is the exact progression of how this repository was developed:

### Phase 1: Foundation & Initial Scaffolding
- Initialized a clean `package.json` utilizing Node.js native testing (`node:test` and `node:assert/strict`).
- Authored `src/math.js` with arithmetic functions (`add`, `subtract`, `multiply`, `divide`) including error handling for division by zero.
- Authored unit test suite in `test/math.test.js` validating assertions.

### Phase 2: First GitHub Actions Workflow
- Created `.github/workflows/ci.yml` defining automated test execution on Ubuntu runners.
- Configured a matrix strategy testing across three major Node versions: `18.x`, `20.x`, and `22.x`.
- Added manual trigger support (`workflow_dispatch`) for on-demand execution.

### Phase 3: Comprehensive Knowledge Base
- Created `docs/github-actions-guide.md` and a styled offline HTML version `docs/github-actions-guide.html` covering core terms, architecture, syntax cheat sheets, and best practices.
- Created `docs/project-overview.md` summarizing project structure and design rationale.

### Phase 4: Continuous Deployment (CD) with GitHub Pages
- Created `public/index.html` providing a live visual web dashboard.
- Created `scripts/build.js` compiling assets and build metadata into `dist/`.
- Extended `.github/workflows/ci.yml` into a 3-stage pipeline (`test` ➔ `build` ➔ `deploy`).
- Enabled GitHub Pages with GitHub Actions as the deployment source.

### Phase 5: Debugging Cross-Platform Differences
- **Issue**: The test command was originally configured as `"node --test test/**/*.test.js"`. While Windows PowerShell parsed `**`, Ubuntu Linux's `/bin/sh` shell does not support recursive `**` without subdirectories, causing `npm test` to exit with code 1.
- **Protection in Action**: GitHub Actions correctly halted the pipeline at Stage 1, preventing the deployment of unverified code.
- **Resolution**: Updated `package.json` to `"node --test"`. Node.js 18+ provides built-in recursive test discovery natively across all operating systems without depending on shell globbing.
- **Outcome**: All jobs passed, and the website successfully deployed to GitHub Pages.

---

## 3. How the Autonomous CI/CD Pipeline Operates

Every commit pushed to `main` or Pull Request opened triggers the workflow defined in `.github/workflows/ci.yml`:

```
                 git push origin main
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│  STAGE 1: Continuous Integration (CI) - Automated Tests│
│  Matrix: Node 18.x | Node 20.x | Node 22.x             │
│  - actions/checkout@v4                                 │
│  - actions/setup-node@v4                               │
│  - npm test                                            │
│  - npm start                                           │
└─────────────────────────┬──────────────────────────────┘
                          │ (All 3 matrix jobs pass ✅)
                          ▼
┌────────────────────────────────────────────────────────┐
│  STAGE 2: Build Web Application                        │
│  - Runs on ubuntu-latest with Node.js 20               │
│  - npm run build                                       │
│  - actions/upload-pages-artifact@v3 (path: ./dist)     │
└─────────────────────────┬──────────────────────────────┘
                          │ (Build succeeds ✅)
                          ▼
┌────────────────────────────────────────────────────────┐
│  STAGE 3: Continuous Deployment (CD) - Deploy Pages    │
│  - actions/deploy-pages@v4                             │
│  - Environment: github-pages                           │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
        🌐 Live URL is updated automatically!
```

---

## 4. How Any User Can Test This on Their PC

Any developer can clone and verify this project locally in under 2 minutes:

### Prerequisites
- [Node.js](https://nodejs.org/) version 18.0.0 or higher installed.
- [Git](https://git-scm.com/) installed.

### Step 1: Clone the Repository
```bash
git clone https://github.com/sumitkrgupta05/Learning-Gtihub-Action.git
cd Learning-Gtihub-Action
```

### Step 2: Run the Unit Tests Locally
```bash
npm test
```
*Expected Output:*
```text
▶ Math functions unit tests
  ✔ should add two numbers correctly
  ✔ should subtract two numbers correctly
  ✔ should multiply two numbers correctly
  ✔ should divide two numbers correctly
  ✔ should throw an error when dividing by zero
✔ Math functions unit tests
ℹ tests 5
ℹ pass 5
ℹ fail 0
```

### Step 3: Run the CLI Application
```bash
npm start
```
*Expected Output:*
```text
=== GitHub Actions Demo App ===
2 + 3 = 5
10 - 4 = 6
5 * 6 = 30
20 / 4 = 5
App executed successfully!
```

### Step 4: Run the Production Build
```bash
npm run build
```
This generates the `dist/` directory containing `index.html`, `build-info.json`, and the standalone documentation guide.

### Step 5: Preview the Web App
Open `dist/index.html` or `public/index.html` directly in any web browser (Chrome, Edge, Firefox, Safari) to interact with the calculator widget and view the live dashboard.

---

## 5. Manual Testing Workflows

You can test the automated behaviors of GitHub Actions through several workflows:

### A. Testing the Manual UI Trigger (`workflow_dispatch`)
1. Open [https://github.com/sumitkrgupta05/Learning-Gtihub-Action/actions](https://github.com/sumitkrgupta05/Learning-Gtihub-Action/actions).
2. Click **"CI/CD Pipeline"** on the left menu.
3. Click **"Run workflow"** ➔ Select branch `main` ➔ Click the green **"Run workflow"** button.
4. Watch the pipeline run autonomously and refresh your live site.

### B. Testing Failure Prevention (Intentional Bug)
1. In `test/math.test.js`, modify an assertion to fail (e.g. change expected `5` to `999`).
2. Commit and push to a child branch:
   ```bash
   git checkout -b test/intentional-failure
   git add test/math.test.js
   git commit -m "Test: introduce failing assertion"
   git push -u origin test/intentional-failure
   ```
3. Open a Pull Request on GitHub.
4. Notice how GitHub Actions flags the PR with a ❌ red cross and **blocks deployment**.
5. Revert the change, push again, and watch the check turn 🟢 green.

---

## 6. Observing Autonomous Execution on GitHub

To verify your pipeline in real time:

1. **Actions Tab**: [Actions Dashboard](https://github.com/sumitkrgupta05/Learning-Gtihub-Action/actions) shows live progress of Test, Build, and Deploy jobs.
2. **Deployments Tab**: [Environment Deployments](https://github.com/sumitkrgupta05/Learning-Gtihub-Action/deployments) displays every active and historical GitHub Pages release.
3. **Live Web URL**: Visit [https://sumitkrgupta05.github.io/Learning-Gtihub-Action/](https://sumitkrgupta05.github.io/Learning-Gtihub-Action/) to confirm the latest commit SHA and build time have updated.
