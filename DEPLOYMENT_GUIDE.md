# Visual Regression Testing Backend - Deployment Guide

## Server Options

### 1. **Linux VPS/Cloud Servers** (Recommended)
- **AWS EC2**: Ubuntu 20.04+ instances
- **DigitalOcean Droplets**: Ubuntu/Debian droplets
- **Google Cloud Compute Engine**: Ubuntu instances
- **Linode**: Ubuntu/CentOS servers
- **Vultr**: Cloud compute instances

**Minimum Requirements:**
- 2GB RAM (4GB recommended)
- 2 CPU cores
- 20GB storage
- Ubuntu 20.04+ or CentOS 8+

### 2. **Container Platforms**
- **Docker**: Containerized deployment
- **Kubernetes**: Scalable container orchestration
- **Docker Swarm**: Multi-node container deployment

### 3. **Platform-as-a-Service (PaaS)**
- **Heroku**: Easy deployment with buildpacks
- **Railway**: Modern deployment platform
- **Render**: Static sites and web services
- **Vercel**: (Backend API only, limited for Puppeteer)

### 4. **Self-Hosted Servers**
- **On-premises Linux servers**
- **Home lab setups**
- **Raspberry Pi clusters** (for testing)

## Deployment Methods

### Method 1: Direct VPS Deployment (Recommended)

```bash
# 1. Connect to your server
ssh user@your-server-ip

# 2. Install dependencies
sudo apt update
sudo apt install -y nodejs npm nginx git

# 3. Install Chrome/Chromium
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt update
sudo apt install -y google-chrome-stable

# 4. Clone your repository
git clone <your-repo-url>
cd dummy-visual-regression/backend

# 5. Run deployment script
chmod +x deploy-production.sh
./deploy-production.sh your-server-name
```

### Method 2: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

# Install Chrome
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Chrome path
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "index.js"]
```

Deploy with Docker:
```bash
# Build image
docker build -t visual-regression-backend .

# Run container
docker run -d \
  --name vr-backend \
  -p 3000:3000 \
  -e SERVER_ID=docker-server \
  -v /app/data:/app/data \
  visual-regression-backend
```

### Method 3: Heroku Deployment

Create `Procfile`:
```
web: node index.js
```

Create `app.json`:
```json
{
  "name": "visual-regression-backend",
  "description": "BackstopJS Visual Regression Testing API",
  "buildpacks": [
    {
      "url": "https://github.com/jontewks/puppeteer-heroku-buildpack"
    },
    {
      "url": "heroku/nodejs"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "SERVER_ID": "heroku-app"
  }
}
```

Deploy:
```bash
# Install Heroku CLI and login
heroku create your-app-name
git push heroku main
```

## Server-Specific Configurations

### For Multiple Servers/Environments

Each server gets its own isolated data:

```bash
# Production Server
./deploy-production.sh production-server

# Staging Server  
./deploy-production.sh staging-server

# Development Server
./deploy-production.sh dev-server
```

### Environment Variables

Set these on your server:

```bash
export NODE_ENV=production
export SERVER_ID=your-server-name
export PORT=3000
export DATA_DIR=./data/your-server-name
export CHROME_USER_DATA_BASE=/tmp/chrome-your-server-name
```

## Domain Configuration

### Option 1: Subdomain per Server
- `production.yourdomain.com` → Production server
- `staging.yourdomain.com` → Staging server
- `dev.yourdomain.com` → Development server

### Option 2: Different Ports
- `yourdomain.com:3000` → Production
- `yourdomain.com:3001` → Staging
- `yourdomain.com:3002` → Development

### Option 3: Path-based Routing
- `yourdomain.com/production/`
- `yourdomain.com/staging/`
- `yourdomain.com/dev/`

## Recommended Server Providers

### **Best Overall: DigitalOcean**
```bash
# Create droplet
doctl compute droplet create visual-regression \
  --size s-2vcpu-4gb \
  --image ubuntu-20-04-x64 \
  --region nyc3
```

### **Budget Option: Vultr**
- $6/month for 1GB RAM instance
- Good for testing/development

### **Enterprise: AWS EC2**
```bash
# Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.medium \
  --key-name your-key-pair
```

### **Easy Setup: Railway**
```bash
# Connect GitHub repo
railway login
railway link
railway up
```

## Security Considerations

### Firewall Setup
```bash
# UFW (Ubuntu)
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # App port
sudo ufw enable
```

### SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Process Management
```bash
# Check service status
sudo systemctl status backstop-your-server-name

# View logs
sudo journalctl -u backstop-your-server-name -f

# Restart service
sudo systemctl restart backstop-your-server-name
```

## Monitoring & Maintenance

### Health Checks
```bash
# Manual health check
curl http://localhost:3000/api/health

# Automated monitoring (add to cron)
*/5 * * * * /path/to/monitor-your-server-name.sh
```

### Log Rotation
```bash
# Add to /etc/logrotate.d/backstop
/path/to/your/app/data/*/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 user user
}
```

## Quick Start Commands

### For Ubuntu 20.04+ Server:
```bash
# Complete setup in one command
curl -sSL https://raw.githubusercontent.com/your-repo/main/backend/deploy-production.sh | bash -s your-server-name
```

### For Docker:
```bash
docker-compose up -d
```

### For Development:
```bash
npm install
npm start
```

## Troubleshooting

### Common Issues:
1. **Chrome not found**: Install google-chrome-stable
2. **Permission denied**: Check file permissions and user groups
3. **Port in use**: Change PORT environment variable
4. **Memory issues**: Increase server RAM or reduce concurrent tests

### Debug Commands:
```bash
# Check Chrome installation
google-chrome --version

# Test Puppeteer
node -e "const puppeteer = require('puppeteer'); puppeteer.launch().then(browser => { console.log('✅ Puppeteer works'); browser.close(); });"

# Check disk space
df -h

# Check memory usage
free -h
```

Choose the deployment method that best fits your infrastructure and requirements! 