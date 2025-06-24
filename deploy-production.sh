#!/bin/bash

# Production Deployment Script for BackstopJS Visual Regression Testing
# This script ensures each server instance has isolated data

set -e

echo "🚀 Starting BackstopJS Backend Deployment..."

# Get server identifier (hostname or custom name)
SERVER_ID=${1:-$(hostname)}
echo "📍 Server ID: $SERVER_ID"

# Create server-specific directories
echo "📁 Creating server-specific directories..."
mkdir -p "data/${SERVER_ID}/backstop_data"
mkdir -p "data/${SERVER_ID}/uploads"
mkdir -p "data/${SERVER_ID}/logs"
mkdir -p "data/${SERVER_ID}/temp"

# Create server-specific environment file
echo "⚙️ Creating server environment configuration..."
cat > ".env.${SERVER_ID}" << EOF
# Server-specific environment variables
NODE_ENV=production
PORT=3000
SERVER_ID=${SERVER_ID}
DATA_DIR=./data/${SERVER_ID}
BACKSTOP_DATA_DIR=./data/${SERVER_ID}/backstop_data
UPLOADS_DIR=./data/${SERVER_ID}/uploads
LOGS_DIR=./data/${SERVER_ID}/logs
TEMP_DIR=./data/${SERVER_ID}/temp
CHROME_USER_DATA_BASE=/tmp/chrome-${SERVER_ID}
MAX_CONCURRENT_TESTS=1
TEST_TIMEOUT=1800000
CLEANUP_INTERVAL=3600000
EOF

# Create server-specific package.json script
echo "📦 Updating package.json for server-specific deployment..."
if ! grep -q "start:${SERVER_ID}" package.json; then
    npm pkg set scripts.start:${SERVER_ID}="NODE_ENV=production SERVER_ID=${SERVER_ID} node index.js"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

# Create systemd service file for this server
echo "🔧 Creating systemd service file..."
sudo tee "/etc/systemd/system/backstop-${SERVER_ID}.service" > /dev/null << EOF
[Unit]
Description=BackstopJS Visual Regression Testing Server (${SERVER_ID})
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
Environment=NODE_ENV=production
Environment=SERVER_ID=${SERVER_ID}
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=backstop-${SERVER_ID}

# Resource limits
LimitNOFILE=65536
MemoryMax=2G
CPUQuota=80%

[Install]
WantedBy=multi-user.target
EOF

# Create nginx configuration for this server
echo "🌐 Creating nginx configuration..."
sudo tee "/etc/nginx/sites-available/backstop-${SERVER_ID}" > /dev/null << EOF
upstream backstop_${SERVER_ID} {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name ${SERVER_ID}.backstop.local backstop-${SERVER_ID}.local;
    
    client_max_body_size 100M;
    
    # Serve static backstop data
    location /backstop_data/ {
        alias $(pwd)/data/${SERVER_ID}/backstop_data/;
        expires 1h;
        add_header Cache-Control "public, immutable";
    }
    
    # Proxy API requests
    location /api/ {
        proxy_pass http://backstop_${SERVER_ID};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 1800;
        proxy_connect_timeout 60;
        proxy_send_timeout 1800;
    }
    
    # Proxy WebSocket connections
    location /socket.io/ {
        proxy_pass http://backstop_${SERVER_ID};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Serve frontend
    location / {
        proxy_pass http://backstop_${SERVER_ID};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable nginx site
if [ -f "/etc/nginx/sites-available/backstop-${SERVER_ID}" ]; then
    sudo ln -sf "/etc/nginx/sites-available/backstop-${SERVER_ID}" "/etc/nginx/sites-enabled/"
    echo "✅ Nginx configuration enabled"
fi

# Create monitoring script
echo "📊 Creating monitoring script..."
cat > "monitor-${SERVER_ID}.sh" << 'EOF'
#!/bin/bash
SERVER_ID=${SERVER_ID}
SERVICE_NAME="backstop-${SERVER_ID}"

check_service() {
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        echo "✅ $SERVICE_NAME is running"
        return 0
    else
        echo "❌ $SERVICE_NAME is not running"
        return 1
    fi
}

check_health() {
    if curl -sf "http://localhost:3000/api/health" > /dev/null; then
        echo "✅ Health check passed"
        return 0
    else
        echo "❌ Health check failed"
        return 1
    fi
}

restart_service() {
    echo "🔄 Restarting $SERVICE_NAME..."
    sudo systemctl restart "$SERVICE_NAME"
    sleep 5
}

# Main monitoring loop
if ! check_service || ! check_health; then
    restart_service
    if check_service && check_health; then
        echo "✅ Service recovered successfully"
    else
        echo "❌ Service recovery failed - manual intervention required"
        exit 1
    fi
fi
EOF

chmod +x "monitor-${SERVER_ID}.sh"

# Create cleanup script
echo "🧹 Creating cleanup script..."
cat > "cleanup-${SERVER_ID}.sh" << EOF
#!/bin/bash
SERVER_ID=${SERVER_ID}
DATA_DIR="./data/\${SERVER_ID}"

echo "🧹 Starting cleanup for server: \${SERVER_ID}"

# Clean up old Chrome processes
pkill -f "chrome.*\${SERVER_ID}" || true

# Clean up old temporary files (older than 1 hour)
find "\${DATA_DIR}/temp" -type f -mmin +60 -delete 2>/dev/null || true
find "/tmp/chrome-\${SERVER_ID}-*" -type d -mmin +60 -exec rm -rf {} + 2>/dev/null || true

# Clean up old log files (older than 7 days)
find "\${DATA_DIR}/logs" -name "*.log" -mtime +7 -delete 2>/dev/null || true

# Clean up old test results (older than 24 hours, keep last 10)
cd "\${DATA_DIR}/backstop_data" 2>/dev/null || exit 0
ls -t | tail -n +11 | head -n -10 | xargs rm -rf 2>/dev/null || true

echo "✅ Cleanup completed for server: \${SERVER_ID}"
EOF

chmod +x "cleanup-${SERVER_ID}.sh"

# Set up cron job for cleanup
echo "⏰ Setting up cleanup cron job..."
(crontab -l 2>/dev/null | grep -v "cleanup-${SERVER_ID}.sh"; echo "0 */4 * * * $(pwd)/cleanup-${SERVER_ID}.sh >> $(pwd)/data/${SERVER_ID}/logs/cleanup.log 2>&1") | crontab -

# Reload systemd and start service
echo "🔄 Reloading systemd and starting service..."
sudo systemctl daemon-reload
sudo systemctl enable "backstop-${SERVER_ID}"
sudo systemctl start "backstop-${SERVER_ID}"

# Test nginx configuration
if command -v nginx &> /dev/null; then
    echo "🧪 Testing nginx configuration..."
    sudo nginx -t && sudo systemctl reload nginx
fi

# Final status check
echo "🎯 Deployment Summary:"
echo "   Server ID: ${SERVER_ID}"
echo "   Service: backstop-${SERVER_ID}"
echo "   Data Directory: $(pwd)/data/${SERVER_ID}"
echo "   Nginx Config: /etc/nginx/sites-available/backstop-${SERVER_ID}"

sleep 3

if systemctl is-active --quiet "backstop-${SERVER_ID}"; then
    echo "✅ Service is running successfully!"
    
    # Test health endpoint
    if curl -sf "http://localhost:3000/api/health" > /dev/null; then
        echo "✅ Health check passed!"
        echo "🌐 Server is ready at: http://${SERVER_ID}.backstop.local"
    else
        echo "⚠️  Service is running but health check failed"
    fi
else
    echo "❌ Service failed to start"
    echo "📋 Check logs with: sudo journalctl -u backstop-${SERVER_ID} -f"
    exit 1
fi

echo ""
echo "🚀 Deployment completed successfully!"
echo ""
echo "📋 Management Commands:"
echo "   Start:   sudo systemctl start backstop-${SERVER_ID}"
echo "   Stop:    sudo systemctl stop backstop-${SERVER_ID}"
echo "   Restart: sudo systemctl restart backstop-${SERVER_ID}"
echo "   Status:  sudo systemctl status backstop-${SERVER_ID}"
echo "   Logs:    sudo journalctl -u backstop-${SERVER_ID} -f"
echo "   Monitor: ./monitor-${SERVER_ID}.sh"
echo "   Cleanup: ./cleanup-${SERVER_ID}.sh" 