# GitHub Setup Instructions

## 1. Initialize Git
```bash
cd taskflow
git init
```

## 2. Add `.gitignore`
Use this minimal `.gitignore`:
```gitignore
node_modules
.env
dist
```

## 3. Commit Code
```bash
git add .
git commit -m "Initial TaskFlow full stack assignment submission"
```

## 4. Create GitHub Repository
1. Create a new repository on GitHub (for example: `taskflow-fsad-assignment`)
2. Copy repository URL

## 5. Push to GitHub
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Recommended Repository Structure
- `backend/`
- `frontend/`
- `docs/`
- `README.md`
