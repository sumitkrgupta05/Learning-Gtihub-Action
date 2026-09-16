# Project Overview: Learning GitHub Actions Hands-On

Welcome to the **GitHub Actions Learning Project**! This document explains what this project is, what we have built so far, why each component exists, and how everything works together.

---

## 1. What We Are Doing Here

The primary objective of this workspace is to learn **GitHub Actions** (the continuous integration and continuous delivery platform built into GitHub) using a real, working, zero-overhead project.

Rather than just reading abstract documentation, we have created a minimal **Node.js** application with automated tests and a live CI (Continuous Integration) pipeline configuration. This lets you observe how code changes trigger automated workflows, test execution, and status checks.

---

## 2. Why a Simple Node.js Project?

We chose a lightweight Node.js setup for several deliberate reasons:

1. **Zero External Dependencies**:
   * Modern Node.js (v18+) includes a native test runner (`node:test`) and assertion library (`node:assert/strict`).
   * No heavy dependencies like Jest, Mocha, or Babel need to be downloaded, keeping workflow runs blazingly fast (under 10 seconds).
2. **Instant Feedback Loop**:
   * Running `npm test` finishes in a few milliseconds.
   * On GitHub Actions, your pipeline passes or fails based strictly on the exit code of `npm test` (exit code `0` = success, non-zero = failure).
3. **Official First-Party Support**:
   * GitHub actively maintains [`actions/setup-node`](https://github.com/actions/setup-node), which is the industry standard action for Node.js pipelines.

---

## 3. Project File Structure

Here is the complete layout of this repository and the role of each file:

```
Github action/
│
├── .github/
│   └── workflows/
│       └── ci.yml             # The GitHub Actions workflow file
│
├── src/
│   ├── index.js               # Application entry point (sample consumer)
│   └── math.js                # Core business logic: add, subtract, multiply, divide
│
├── test/
│   └── math.test.js           # Automated unit tests using Node.js native test runner
│
├── docs/
│   ├── project-overview.md     # (This file) Overview of what we built & how to use it
│   ├── github-actions-guide.md # Comprehensive guide to GitHub Actions concepts & terms
│   └── github-actions-guide.html # Standalone styled HTML documentation
│
├── .gitignore                 # Tells git which files to ignore (node_modules, logs, etc.)
├── package.json               # Defines project metadata and scripts ("test", "start")
└── README.md                  # Quick-start guide and repository landing page
```

---

## 4. How the Code Works

### A. The Business Logic (`src/math.js`)
Contains basic arithmetic operations (`add`, `subtract`, `multiply`, `divide`) with edge-case handling (throwing an error on division by zero).

### B. The Unit Tests (`test/math.test.js`)
Validates that our logic behaves as expected using Node's native test runner:
* Tests regular arithmetic operations.
* Tests edge cases (e.g., verifying `divide(10, 0)` throws `"Cannot divide by zero"`).

### C. Local Execution
You can test this code locally at any time:
```bash
# Run the test suite
npm test

# Run the demo script
npm start
```

---

## 5. How the GitHub Actions Pipeline Works

The workflow file is located at [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). Here is what happens when you push code to GitHub:

```
        Developer runs: git push origin main
                        │
                        ▼
┌───────────────────────────────────────────────┐
│              GitHub Repository                │
│   Detects "push" event on branch "main"       │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             GitHub Actions Engine             │
│   Reads: .github/workflows/ci.yml             │
│   Spawns 3 parallel runners (Matrix build)    │
└───────┬───────────────┼───────────────┬───────┘
        │               │               │
        ▼               ▼               ▼
┌──────────────┐┌──────────────┐┌──────────────┐
│ Runner Node  ││ Runner Node  ││ Runner Node  │
│   v18.x      ││   v20.x      ││   v22.x      │
│ (ubuntu-vm)  ││ (ubuntu-vm)  ││ (ubuntu-vm)  │
├──────────────┤├──────────────┤├──────────────┤
│ 1. Checkout  ││ 1. Checkout  ││ 1. Checkout  │
│ 2. Setup v18 ││ 2. Setup v20 ││ 2. Setup v22 │
│ 3. npm test  ││ 3. npm test  ││ 3. npm test  │
│ 4. npm start ││ 4. npm start ││ 4. npm start │
└───────┬──────┘└───────┬──────┘└───────┬──────┘
        │               │               │
        └───────────────┼───────────────┘
                        │
                        ▼
        All jobs report status: ✅ SUCCESS / ❌ FAILURE
```

### Key Workflow Highlights:
* **Triggers (`on`)**: Configured to run on `push`, `pull_request`, or via manual click in GitHub UI (`workflow_dispatch`).
* **Matrix Strategy (`strategy.matrix`)**: Automatically spawns **3 parallel virtual machines** running Ubuntu to test your code against Node 18, 20, and 22.
* **Prebuilt Actions**:
  * `actions/checkout@v4`: Clones the repository onto the virtual machine.
  * `actions/setup-node@v4`: Downloads and configures the requested Node version.

---

## 6. What to Do Next

1. **Read the Full GitHub Actions Guide**: Open [`github-actions-guide.md`](./github-actions-guide.md) or double-click [`github-actions-guide.html`](./github-actions-guide.html) in your browser for a deep dive into GitHub Actions architecture, syntax, and terminology.
2. **Push to GitHub**: Initialize a git repository and push this directory to your GitHub account to watch your workflow run live in the **Actions** tab.
3. **Experiment with Failure**: Edit `src/math.js` or `test/math.test.js` to introduce a deliberate bug, push the code, and see how GitHub Actions catches the error and marks the commit with a red cross `❌`.
