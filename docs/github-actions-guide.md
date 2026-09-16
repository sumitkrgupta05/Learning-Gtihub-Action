# The Comprehensive Guide to GitHub Actions

---

## 📖 Table of Contents
1. [What is GitHub Actions?](#1-what-is-github-actions)
2. [Why Use GitHub Actions?](#2-why-use-github-actions)
3. [How GitHub Actions Works (Core Architecture)](#3-how-github-actions-works-core-architecture)
4. [Folder Structure & Convention Standards](#4-folder-structure--convention-standards)
5. [Important Terms & Core Concepts](#5-important-terms--core-concepts)
6. [Workflow Syntax & Directives Cheat Sheet](#6-workflow-syntax--directives-cheat-sheet)
7. [Secrets, Variables & Environments](#7-secrets-variables--environments)
8. [Advanced Patterns: Matrix Builds, Caching & Artifacts](#8-advanced-patterns-matrix-builds-caching--artifacts)
9. [Best Practices & Security Rules](#9-best-practices--security-rules)
10. [Summary & Quick Reference](#10-summary--quick-reference)

---

## 1. What is GitHub Actions?

**GitHub Actions** is an event-driven automation platform built directly into GitHub. It allows software teams to automate, customize, and execute software development workflows right in their repository.

While it is most commonly used for **Continuous Integration (CI)** and **Continuous Delivery/Deployment (CD)**, GitHub Actions can automate nearly any lifecycle event in your repository, including:
- Running tests and linters whenever code is pushed.
- Automatically deploying applications to cloud services (AWS, Azure, GCP, Vercel, etc.).
- Labeling or closing stale issues and pull requests.
- Publishing packages to npm, PyPI, or Docker Hub.
- Sending notifications to Slack, Discord, or Teams.

---

## 2. Why Use GitHub Actions?

Prior to GitHub Actions, developers had to connect third-party CI/CD tools (like Jenkins, Travis CI, or CircleCI) through webhooks and manage external credentials. GitHub Actions revolutionized this by offering:

| Advantage | Why It Matters |
| :--- | :--- |
| **Native Integration** | No third-party accounts or webhook setups required; everything runs inside your existing GitHub repository. |
| **Event-Driven Versatility** | Triggers on virtually *any* GitHub event (pushes, pull requests, issue comments, star events, schedules, or manual clicks). |
| **Rich Marketplace** | Over 20,000+ prebuilt actions created by GitHub and the community (e.g. `actions/checkout`, `docker/build-push-action`). |
| **Matrix Builds** | Test against multiple operating systems (Ubuntu, Windows, macOS) and runtime versions simultaneously. |
| **Generous Free Tier** | Free for public repositories with unlimited minutes, and includes generous free minutes per month for private repositories. |
| **Unified UI & Security** | View logs, test results, secrets, and deployment history directly beside your pull requests and code commits. |

---

## 3. How GitHub Actions Works (Core Architecture)

GitHub Actions operates on a clear hierarchy of components:

```
┌────────────────────────────────────────────────────────┐
│                        EVENT                           │
│        (e.g., git push, pull_request, cron)            │
└───────────────────────────┬────────────────────────────┘
                            │ triggers
                            ▼
┌────────────────────────────────────────────────────────┐
│                       WORKFLOW                         │
│             (.github/workflows/*.yml)                  │
└───────────────────────────┬────────────────────────────┘
                            │ contains one or more
                            ▼
┌────────────────────────────────────────────────────────┐
│                         JOBS                           │
│          (Run in parallel by default on a Runner)      │
│   ┌─────────────────────┐    ┌─────────────────────┐   │
│   │     Job 1: Lint     │    │     Job 2: Test     │   │
│   └──────────┬──────────┘    └──────────┬──────────┘   │
└──────────────┼──────────────────────────┼──────────────┘
               │                          │
               ▼                          ▼
┌────────────────────────────────────────────────────────┐
│                        RUNNER                          │
│     (A virtual machine: ubuntu, windows, or macos)     │
└──────────────────────────┬─────────────────────────────┘
                           │ executes
                           ▼
┌────────────────────────────────────────────────────────┐
│                        STEPS                           │
│     (Tasks executed sequentially inside the runner)    │
│   1. Run action: actions/checkout@v4                   │
│   2. Run action: actions/setup-node@v4                 │
│   3. Run shell command: npm install                    │
│   4. Run shell command: npm test                       │
└────────────────────────────────────────────────────────┘
```

---

## 4. Folder Structure & Convention Standards

GitHub Actions strictly mandates where workflow files are stored. Any file outside this directory will **not** be recognized as a workflow.

### Standard Repository Structure
```
my-repository/
│
├── .github/                       <-- Must be in the root directory (starts with a dot)
│   ├── workflows/                 <-- Plural: "workflows" (contains all YAML pipeline files)
│   │   ├── ci.yml                 <-- Continuous Integration workflow
│   │   ├── release.yml            <-- Release / deploy workflow
│   │   └── nightly-audit.yml      <-- Scheduled cron workflow
│   │
│   ├── actions/                   <-- (Optional) Custom local composite actions
│   │   └── setup-project/
│   │       └── action.yml
│   │
│   └── CODEOWNERS                 <-- (Optional) GitHub configuration files
│
├── src/                           <-- Your project source code
├── test/                          <-- Your test files
└── package.json
```

> **Rules & Tips**:
> - Files inside `.github/workflows/` must end in `.yml` or `.yaml`.
> - You can have multiple workflow files in `.github/workflows/`. Each workflow operates independently.
> - Workflows can have human-readable names (`name: Run Tests`) to differentiate them in the GitHub Actions tab.

---

## 5. Important Terms & Core Concepts

Understanding these 8 terms is essential for mastering GitHub Actions:

### 1. Workflow
A configurable automated process composed of one or more jobs. Defined as a single YAML file inside `.github/workflows/`.

### 2. Event (`on:`)
A specific activity that triggers a workflow run. Common events include:
- `push`: Triggered when code is pushed to a branch or tag.
- `pull_request`: Triggered when a PR is opened, updated, or synchronized.
- `schedule`: Triggered at specific times using standard POSIX cron syntax.
- `workflow_dispatch`: Adds a manual "Run workflow" button in the GitHub UI.
- `issues`: Triggered when an issue is created, edited, or closed.

### 3. Job
A set of steps that execute on the **same runner**.
- By default, multiple jobs in a workflow execute **in parallel**.
- You can make jobs run sequentially by defining dependencies with `needs: [job_id]`.

### 4. Runner
A server that executes your workflow jobs. GitHub provides two categories:
- **GitHub-hosted runners**: Fresh, isolated VMs maintained by GitHub (`ubuntu-latest`, `windows-latest`, `macos-latest`). Cleaned and discarded after each job.
- **Self-hosted runners**: Your own physical servers, on-premise VMs, or cloud instances configured with the GitHub Actions runner agent.

### 5. Step
An individual task inside a job. Steps inside the same job execute **sequentially** on the same runner VM. A step can:
- Run shell commands using `run:`.
- Execute a reusable community action using `uses:`.

### 6. Action
A reusable, standalone unit of code designed to perform a specific task (e.g. checking out code, installing Node, building a Docker image). Actions can be:
- Created by GitHub (e.g., `actions/checkout@v4`).
- Sourced from the GitHub Marketplace.
- Written locally in your repository as composite actions.

### 7. Contexts & Expressions
Expressions allow you to dynamically access runtime information and perform logical checks using `${{ <expression> }}` syntax:
- `${{ github.actor }}`: The username of the person who initiated the event.
- `${{ github.ref }}`: The branch or tag that triggered the run.
- `${{ secrets.MY_SECRET }}`: Decrypted repository secret.
- `${{ matrix.node-version }}`: Current iteration value in a matrix strategy.

### 8. Artifacts
Files or bundles produced during a workflow execution (e.g., compiled binaries, test coverage reports, log files) that you want to persist after the runner VM is destroyed. Handled via `actions/upload-artifact` and `actions/download-artifact`.

---

## 6. Workflow Syntax & Directives Cheat Sheet

Here is a quick-reference guide to the primary YAML directives:

```yaml
# 1. Workflow Name
name: CI/CD Pipeline

# 2. Trigger Events
on:
  push:
    branches: [ main, develop ]
    paths-ignore:
      - '**.md'                # Skip workflow if only markdown files change
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'        # Runs daily at 02:00 UTC
  workflow_dispatch:           # Allows manual triggering

# 3. Environment Variables (available across all jobs)
env:
  NODE_ENV: test

# 4. Jobs Definition
jobs:
  # Job 1: Build and Test
  build-and-test:
    name: Build & Test
    runs-on: ubuntu-latest
    timeout-minutes: 15        # Protects against hanging jobs

    steps:
      - name: Clone Repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'         # Automatically caches node_modules

      - name: Install Dependencies
        run: npm ci

      - name: Run Tests
        run: npm test

  # Job 2: Deploy (Only runs if 'build-and-test' succeeds)
  deploy:
    name: Deploy to Production
    needs: [build-and-test]    # Sequential dependency
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' # Only runs on main branch

    steps:
      - name: Deploy step
        run: echo "Deploying application to production..."
```

---

## 7. Secrets, Variables & Environments

Security is paramount in automated pipelines. Never hardcode API keys, passwords, or tokens in your YAML files.

### Repository Secrets
1. Navigate to your repository on GitHub: **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret** (e.g., `AWS_ACCESS_KEY_ID`, `NPM_TOKEN`).
3. Access them securely in your workflow:
   ```yaml
   - name: Deploy to Cloud
     env:
       API_KEY: ${{ secrets.MY_API_KEY }}
     run: ./deploy.sh
   ```

### Predefined `GITHUB_TOKEN`
GitHub automatically provisions a short-lived token (`secrets.GITHUB_TOKEN`) for every workflow run. You can use it to interact with GitHub APIs (such as commenting on PRs, creating releases, or reading packages) with granular `permissions:`:
```yaml
permissions:
  contents: read
  pull-requests: write
```

---

## 8. Advanced Patterns: Matrix Builds, Caching & Artifacts

### A. Matrix Builds (Cross-Platform / Cross-Version Testing)
A matrix allows you to test multiple permutations of operating systems and programming language versions with minimal YAML:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node-version: [18.x, 20.x, 22.x]

runs-on: ${{ matrix.os }}
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
  - run: npm test
```
*(This single configuration automatically runs 6 parallel jobs: 2 OS × 3 Node versions!)*

### B. Dependency Caching
Speed up your workflows by reusing downloaded packages between runs:
```yaml
- name: Cache dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### C. Storing Artifacts
Pass files between jobs or save build outputs for download:
```yaml
- name: Upload Build Artifact
  uses: actions/upload-artifact@v4
  with:
    name: production-build
    path: dist/
```

---

## 9. Best Practices & Security Rules

1. **Always Set `timeout-minutes`**:
   Prevent runaway or stuck processes from consuming all your monthly runner minutes.
   ```yaml
   timeout-minutes: 10
   ```
2. **Use Minimal Permissions**:
   Explicitly declare least-privilege permissions at the top of the workflow or job level:
   ```yaml
   permissions:
     contents: read
   ```
3. **Pin Action Versions**:
   In high-security production pipelines, pin actions to full commit SHAs instead of mutable tags:
   ```yaml
   uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1
   ```
4. **Use `npm ci` instead of `npm install` in CI**:
   `npm ci` strictly honors `package-lock.json` and guarantees deterministic, reproducible installations.
5. **Use Paths Filtering to Save Minutes**:
   Avoid triggering heavy test suites if only documentation or README files changed:
   ```yaml
   on:
     push:
       paths-ignore:
         - 'docs/**'
         - '**.md'
   ```

---

## 10. Summary & Quick Reference

| Concept | YAML Key | What it Does |
| :--- | :--- | :--- |
| **Trigger** | `on:` | Defines when the workflow runs (`push`, `pull_request`, etc.) |
| **Environment** | `runs-on:` | Specifies the runner VM OS (`ubuntu-latest`, `windows-latest`) |
| **Parallel Matrix** | `strategy.matrix:` | Runs jobs across combinations of versions/platforms |
| **Dependencies** | `needs:` | Specifies job prerequisites for sequential pipelines |
| **External Action**| `uses:` | Executes a prebuilt action from GitHub Marketplace |
| **Shell Command**  | `run:` | Runs inline bash/powershell commands |
| **Inputs**         | `with:` | Passes parameters to a prebuilt action |
| **Environment Vars**| `env:` | Sets environment variables for a job or step |
| **Secrets**        | `${{ secrets.X }}` | Safely injects encrypted secrets |
