# ServiceNow PDI to GitHub Integration Guide

## ✅ Current Status
- **GitHub Repository**: https://github.com/aasritavoleti-blip/Social-Media-Anaytics.git
- **Default Branch**: `main` (both locally and on GitHub)
- **ServiceNow Instance**: https://dev347812.service-now.com
- **Connection Status**: ✅ WORKING

## 📋 Branch Configuration

### GitHub Repository Branches:
- `main` - Primary development branch (DEFAULT)
- `servicenow` - ServiceNow-specific customizations

### ServiceNow Source Control Setup:

#### Option 1: Link ServiceNow to `main` branch (Recommended)
1. Log into ServiceNow PDI: https://dev347812.service-now.com
2. Navigate to: **Source Control > Links**
3. Click **New** or edit existing link
4. Configure:
   - **Type**: Git
   - **URL**: https://github.com/aasritavoleti-blip/Social-Media-Anaytics.git
   - **Branch**: main
   - **Username**: Your GitHub username
   - **Password**: Your GitHub Personal Access Token (PAT)
   - **Application**: SMA Platform (x_1939553_smv)

#### Option 2: Link ServiceNow to `servicenow` branch
- Same as above but set Branch to: `servicenow`
- Use this if you want to keep ServiceNow-specific changes separate

## 🔧 Creating GitHub Personal Access Token (PAT)

If commits from ServiceNow are failing, you need a PAT:

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Select scopes:
   - ✅ repo (full control of private repositories)
   - ✅ workflow
4. Click **Generate token**
5. **COPY THE TOKEN IMMEDIATELY** - you won't see it again
6. Use this token as the password in ServiceNow source control configuration

## 📤 Committing Changes from ServiceNow to GitHub

### Method 1: Using Application Repository (Recommended)
1. In ServiceNow, go to **Application Repository**
2. Select your application: `x_1939553_smv`
3. Click **Commit Changes**
4. Add commit message
5. Click **Commit & Push**
6. Verify on GitHub: https://github.com/aasritavoleti-blip/Social-Media-Anaytics/commits/main

### Method 2: Using Source Control Links
1. Navigate to **Source Control > Links**
2. Select your repository link
3. Click **Push to Remote**
4. Check the status for any errors

## 🔍 Troubleshooting Common Issues

### Issue: "Authentication failed"
**Solution**: 
- Generate a new GitHub PAT (see above)
- Update the password in ServiceNow source control link
- Test the connection

### Issue: "Branch not found"
**Solution**:
- Verify branch name matches exactly (main vs master)
- Check GitHub repository has the branch: `git branch -a`
- Create branch if missing: `git checkout -b main`

### Issue: "Push rejected" or "Pull required"
**Solution**:
1. In ServiceNow, click **Pull from Remote** first
2. Resolve any conflicts
3. Then click **Push to Remote**

### Issue: Changes not showing on GitHub
**Solution**:
- Verify you're pushing to correct branch
- Check ServiceNow commit history: **Source Control > Commits**
- Verify GitHub remote URL in ServiceNow

## 🧪 Testing the Integration

### Test 1: Verify ServiceNow Connection
```bash
cd c:\Users\YASHASVI\social-analytics
node verify-snow.js
```

### Test 2: Verify GitHub Sync
```bash
cd c:\Users\YASHASVI\social-analytics
git pull origin main
git status
```

### Test 3: Test Commit Workflow
1. Make a small change in ServiceNow (e.g., update a script)
2. Commit from ServiceNow Application Repository
3. Check GitHub for the new commit
4. Pull locally: `git pull origin main`

## 📊 Project Structure

### Frontend (React):
- `src/` - React components (App.js, Incidents.js, Engagement.js, etc.)
- `public/` - Static files
- Runs on: http://localhost:3000

### Backend (Node.js):
- `server.js` - Express proxy server for ServiceNow API
- Runs on: http://localhost:5000
- Endpoints:
  - `/api/social-media-comments` - Fetch comments from ServiceNow
  - `/api/instagram-posts` - Fetch Instagram posts
  - `/api/incidents` - Fetch/create incidents
  - `/api/servicenow-status` - Connection health check

### ServiceNow Tables:
- `x_1939553_smv_social_media_comments` - Social media comments
- `x_1939553_smv_instagram_posts` - Instagram posts
- `incident` - Standard ServiceNow incidents

## 🚀 Quick Start Commands

### Start Frontend:
```bash
npm start
```

### Start Backend:
```bash
node server.js
```

### Verify ServiceNow:
```bash
node verify-snow.js
```

### Git Operations:
```bash
git status                    # Check status
git pull origin main          # Pull latest changes
git push origin main          # Push changes to GitHub
git log --oneline -10         # View recent commits
```

## 📝 Important Notes

1. **Branch Naming**: GitHub uses `main` as default (not `master`)
2. **ServiceNow Application Scope**: x_1939553_smv
3. **Always pull before pushing** to avoid conflicts
4. **Use .env file** for credentials (already in .gitignore)
5. **Never commit** .env, node_modules, or build folders

## ✅ Checklist for ServiceNow → GitHub Sync

- [ ] Source Control Link configured in ServiceNow
- [ ] GitHub PAT created and configured
- [ ] Branch set to `main` (not master)
- [ ] Test commit successful
- [ ] Changes visible on GitHub
- [ ] Local repository synced with `git pull`

---

**Last Updated**: 2026-05-12
**Status**: All systems operational ✅
