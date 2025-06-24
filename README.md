# BackstopJS Visual Regression Testing Server

A powerful, session-based visual regression testing server built with BackstopJS, featuring browser isolation, concurrent testing, and comprehensive session management.

## 🚀 Features

- **Session-based Browser Isolation**: Each test session runs in its own isolated browser instance
- **Concurrent Test Execution**: Multiple tests can run simultaneously without interference
- **Real-time Progress Updates**: WebSocket-based live progress updates
- **Excel File Support**: Upload and test URLs from Excel files
- **Automatic Resource Management**: Intelligent cleanup of browser instances and old sessions
- **Health Monitoring**: Built-in health checks and system monitoring
- **Docker Support**: Full containerization with Docker and Docker Compose
- **RESTful API**: Comprehensive REST API for all operations
- **Graceful Shutdown**: Proper cleanup on server shutdown

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- Docker and Docker Compose (for containerized deployment)
- Chrome/Chromium browser (for local development)

## 🛠 Installation

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Start the server**
   ```bash
   ./deploy.sh start
   ```

3. **Check status**
   ```bash
   ./deploy.sh status
   ```

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment

### Quick Start

```bash
# Build and start the server
./deploy.sh start

# Check server status
./deploy.sh status

# View logs
./deploy.sh logs

# Stop the server
./deploy.sh stop
```

### Docker Compose

```bash
# Start with docker-compose
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

## 📡 API Endpoints

### Core Testing Endpoints

#### Start URL Comparison Test
```http
POST /api/test
Content-Type: application/json

{
  "prodUrl": "https://production-site.com",
  "stagingUrl": "https://staging-site.com"
}
```

#### Upload Excel File
```http
POST /api/upload-excel
Content-Type: multipart/form-data

Form data: excelFile (file)
```

#### Test URLs from Excel
```http
POST /api/test-excel
Content-Type: application/json

{
  "sessionId": "session-uuid-here"
}
```

### Session Management

#### Get Session Status
```http
GET /api/session/:sessionId
```

#### List All Sessions
```http
GET /api/sessions
```

#### Reset Session
```http
POST /api/reset/:sessionId
```

#### Reset All Sessions
```http
POST /api/reset
```

### Results and Health

#### Get Test Results
```http
GET /api/results/:sessionId
GET /api/results (all results)
```

#### Health Check
```http
GET /api/health
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# Puppeteer Configuration
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
PUPPETEER_ARGS=--no-sandbox,--disable-setuid-sandbox,--disable-dev-shm-usage,--disable-gpu

# Browser Pool Configuration
MAX_BROWSERS=3
BROWSER_TIMEOUT=600000

# Session Configuration
SESSION_TIMEOUT=1800000
MAX_SESSION_AGE=7200000
CLEANUP_INTERVAL=1800000
```

## 📊 Session Management

The server uses UUID-based sessions to ensure complete isolation between different test runs:

- **Session Creation**: Each test creates a unique session with its own directory structure
- **Browser Isolation**: Each session gets its own browser instance with unique user data directory
- **Resource Cleanup**: Automatic cleanup of old sessions and browser instances
- **Concurrent Testing**: Multiple sessions can run simultaneously without interference

## 🔄 WebSocket Events

The server provides real-time updates via WebSocket:

### Client → Server Events
- `subscribe-session`: Subscribe to session updates
- `unsubscribe-session`: Unsubscribe from session
- `cancel-session`: Cancel a running session

### Server → Client Events
- `status`: Test progress updates
- `error`: Error notifications
- `complete`: Test completion with results
- `session-cancelled`: Session cancellation confirmation
- `server-shutdown`: Server shutdown notification

## 🚀 Deployment Scripts

### Available Commands

```bash
# Build Docker image
./deploy.sh build

# Start the server
./deploy.sh start

# Stop the server
./deploy.sh stop

# Restart the server
./deploy.sh restart

# Check server status
./deploy.sh status

# View server logs
./deploy.sh logs

# Update and restart
./deploy.sh update

# Backup data
./deploy.sh backup

# Clean up old data
./deploy.sh cleanup

# Check server health
./deploy.sh health
```

### NPM Scripts

```bash
# Development
npm run dev

# Production
npm run prod

# Docker operations
npm run docker:build
npm run docker:compose
npm run docker:down

# Deployment
npm run deploy
npm run deploy:status
npm run deploy:logs

# Health check
npm run health
```

## 📁 Directory Structure

```
backend/
├── backstop_data/           # Test results and session data
│   └── [session-id]/        # Session-specific directories
│       ├── bitmaps_reference/
│       ├── bitmaps_test/
│       ├── html_report/
│       └── engine_scripts/
├── uploads/                 # Uploaded Excel files
├── index.js                 # Main server file
├── package.json
├── Dockerfile
├── docker-compose.yml
├── nginx.conf              # Load balancer configuration
├── deploy.sh               # Deployment script
└── README.md
```

## 🔍 Monitoring and Health Checks

### Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "activeSessions": 2,
  "activeBrowsers": 3,
  "uptime": 3600,
  "memory": {
    "rss": 123456789,
    "heapTotal": 67890123,
    "heapUsed": 45678901,
    "external": 12345678
  }
}
```

### Server Logs

```bash
# View live logs
./deploy.sh logs

# Or with docker-compose
docker-compose logs -f backstop-backend
```

## 🛡 Security Features

- **Non-root container execution**: Docker container runs as non-root user
- **Sandboxed browsers**: Chrome runs with security flags
- **Session isolation**: Complete isolation between test sessions
- **Resource limits**: Memory and CPU limits in Docker
- **File upload validation**: Secure file upload handling

## 🔧 Troubleshooting

### Common Issues

1. **Chrome/Puppeteer Issues**
   ```bash
   # Ensure Chrome dependencies are installed
   apt-get update && apt-get install -y google-chrome-stable
   ```

2. **Memory Issues**
   ```bash
   # Increase Docker memory limits in docker-compose.yml
   deploy:
     resources:
       limits:
         memory: 4G
   ```

3. **Permission Issues**
   ```bash
   # Make sure deploy script is executable
   chmod +x deploy.sh
   ```

4. **Port Conflicts**
   ```bash
   # Change port in docker-compose.yml or .env file
   PORT=3001
   ```

### Debug Mode

Enable debug logging:
```bash
DEBUG=* npm run dev
```

## 📈 Performance Optimization

- **Browser Pool Management**: Reuses browser instances when possible
- **Async Processing**: Concurrent image processing with configurable limits
- **Resource Cleanup**: Automatic cleanup of old sessions and files
- **Memory Management**: Proper disposal of browser instances

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check the health endpoint: `/api/health`
2. Review server logs: `./deploy.sh logs`
3. Check session status: `/api/sessions`
4. Verify Docker status: `./deploy.sh status` 