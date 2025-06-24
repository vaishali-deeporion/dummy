# 🆓 Free Deployment Guide - Visual Regression Testing

## 🚀 Railway (Recommended - Easiest)

### Step 1: Prepare Your Code
```bash
# Make sure you're in the backend directory
cd backend

# Your code is already ready!
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Choose the `backend` folder
6. Click "Deploy"

**That's it!** Railway will:
- ✅ Automatically detect it's a Node.js app
- ✅ Install dependencies
- ✅ Start your server
- ✅ Give you a public URL

### Step 3: Configure Environment
In Railway dashboard, add these environment variables:
```
NODE_ENV=production
SERVER_ID=railway-prod
PORT=$PORT
```

**Your app will be live at**: `https://your-app-name.up.railway.app`

---

## 🌐 Render (Alternative Free Option)

### Step 1: Deploy
1. Go to [render.com](https://render.com)
2. Connect your GitHub account
3. Click "New Web Service"
4. Select your repository
5. Configure:
   - **Name**: visual-regression-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

### Step 2: Environment Variables
Add in Render dashboard:
```
NODE_ENV=production
SERVER_ID=render-prod
```

**Live URL**: `https://your-app-name.onrender.com`

---

## ☁️ Google Cloud (Free Credits)

### Step 1: Get Free Credits
1. Go to [cloud.google.com](https://cloud.google.com)
2. Sign up for free trial ($300 credit)
3. Create new project

### Step 2: Deploy with Cloud Run
```bash
# Install Google Cloud CLI
curl https://sdk.cloud.google.com | bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Deploy directly from your code
gcloud run deploy visual-regression \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔧 Oracle Cloud (Always Free)

### Step 1: Create Account
1. Go to [oracle.com/cloud/free](https://oracle.com/cloud/free)
2. Sign up (requires credit card for verification, but won't charge)
3. Create compute instance

### Step 2: Setup Instance
```bash
# Connect to your instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and run your app
git clone https://github.com/your-username/dummy-visual-regression.git
cd dummy-visual-regression/backend
npm install
node index.js
```

---

## 📋 Comparison of Free Options

| Platform | Free Limit | Sleeps? | Custom Domain | Best For |
|----------|------------|---------|---------------|----------|
| **Railway** | $5/month credit | No | Yes | **Recommended** |
| **Render** | 750 hours/month | Yes (15min) | Yes | Good alternative |
| **Heroku** | Limited free | Yes (30min) | Yes | Classic choice |
| **Google Cloud** | $300 credit | No | Yes | Learning cloud |
| **Oracle Cloud** | Forever free | No | Yes | Best long-term |

---

## 🎯 Quick Start (Railway - 5 minutes)

1. **Push your code to GitHub** (if not already)
2. **Go to railway.app**
3. **Click "Deploy from GitHub"**
4. **Select your repo**
5. **Wait 2 minutes for deployment**
6. **Get your free URL!**

**Your Visual Regression Testing API will be live and ready to use!**

---

## 🔍 Testing Your Deployment

Once deployed, test with:
```bash
# Replace with your actual URL
curl https://your-app.up.railway.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T12:00:00.000Z",
  "isTestRunning": false
}
```

---

## 💡 Pro Tips for Free Deployments

1. **Railway**: Best overall experience, generous free tier
2. **Keep it active**: Some free tiers sleep after inactivity
3. **Monitor usage**: Check your free tier limits
4. **Scale later**: Start free, upgrade when needed

**Choose Railway for the easiest deployment experience!** 