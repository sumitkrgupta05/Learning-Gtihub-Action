# GitHub Actions Demo: Node.js CI

A lightweight, zero-dependency starter project to learn **GitHub Actions** from scratch.

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml          <-- The GitHub Actions workflow configuration
├── src/
│   ├── index.js            <-- Simple entry point
│   └── math.js             <-- Sample math functions to test
├── test/
│   └── math.test.js        <-- Unit tests (Node.js built-in test runner)
├── docs/
│   ├── project-overview.md     <-- Project setup & explanation
│   ├── github-actions-guide.md <-- Master reference guide
│   └── github-actions-guide.html <-- Styled HTML documentation
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 Local Testing

You don't need to install any heavy dependencies. This project uses Node's native test runner (Node 18+):

```bash
# Run unit tests
npm test

# Run the sample app
npm start
```

---

## 🚀 How to Run this in GitHub Actions

Follow these steps to connect this project to your GitHub account:

### 1. View Actions
1. Open your repository in GitHub.
2. Click on the **Actions** tab at the top.
3. You will see the **Node.js CI** workflow running!
4. Notice how it creates **3 parallel jobs** (Node `18.x`, `20.x`, and `22.x`) due to the `matrix` strategy in [.github/workflows/ci.yml](.github/workflows/ci.yml).
5. Click on any job to view live logs of the steps being executed.

---

## 🎯 Next Learning Experiments to Try

Once you see your first green checkmark, try these experiments:

1. **Make a test fail**: Change an assertion in `test/math.test.js` (e.g., expect `2 + 3` to equal `6`), commit, and push. Watch how GitHub Actions reports the failure and flags the commit with a red cross.
2. **Pull Request checks**: Create a new branch (`git checkout -b feature/test`), make a change, push, and open a Pull Request. Notice how GitHub Actions automatically validates the PR before merging.
3. **Manual Trigger (`workflow_dispatch`)**: Go to the Actions tab, select "Node.js CI", and click **"Run workflow"** to trigger it manually without making a commit.
