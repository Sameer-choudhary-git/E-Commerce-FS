# Vercel Deployment Guide for Frontend

## Prerequisites
- Vercel account (sign up at vercel.com)
- GitHub repository pushed (already done ✅)

## Deployment Steps

### 1. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `E-Commerce-FS`

### 2. Configure Project Settings
- **Framework Preset:** Create React App
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### 3. Environment Variables
Add the following environment variable in Vercel dashboard:
- **Key:** `REACT_APP_BACKEND_URL`
- **Value:** Your backend URL (e.g., `https://your-backend-app.onrender.com`)

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Frontend Configuration

The frontend is already configured with:
- ✅ Environment variable support for backend URL
- ✅ Vercel.json configuration file
- ✅ Proper routing for SPA
- ✅ Build scripts in package.json

## Backend Integration

Make sure your backend (deployed on Render) has CORS configured to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'https://your-vercel-app.vercel.app',
    'http://localhost:3000'
  ]
}));
```

## Post-Deployment
1. Update `REACT_APP_BACKEND_URL` with your actual backend URL
2. Test all API endpoints
3. Verify authentication and cart functionality

## Commands for Local Development
```bash
cd frontend
npm install
npm start
```

## Vercel CLI (Optional)
Install Vercel CLI for command-line deployment:
```bash
npm i -g vercel
cd frontend
vercel --prod
