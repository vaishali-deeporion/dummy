#!/bin/bash

# BackstopJS Visual Regression Testing Server Deployment Script
# Usage: ./deploy.sh [start|stop|restart|status|logs|build]

set -e

PROJECT_NAME="backstop-backend"
DOCKER_IMAGE="backstop-backend:latest"
CONTAINER_NAME="backstop-backend-container"
NETWORK_NAME="backstop-network"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Build Docker image
build() {
    log "Building Docker image..."
    docker build -t $DOCKER_IMAGE .
    log "Docker image built successfully"
}

# Start the service
start() {
    log "Starting BackstopJS Visual Regression Testing Server..."
    
    # Create network if it doesn't exist
    docker network create $NETWORK_NAME 2>/dev/null || true
    
    # Start with docker-compose
    docker-compose up -d
    
    log "Server started successfully"
    log "Server is running at http://localhost:3000"
    log "Health check: http://localhost:3000/api/health"
    
    # Wait for server to be ready
    sleep 5
    check_health
}

# Stop the service
stop() {
    log "Stopping BackstopJS Visual Regression Testing Server..."
    docker-compose down
    log "Server stopped successfully"
}

# Restart the service
restart() {
    log "Restarting BackstopJS Visual Regression Testing Server..."
    stop
    start
}

# Check service status
status() {
    info "Checking service status..."
    
    if docker-compose ps | grep -q "Up"; then
        log "Service is running"
        docker-compose ps
        
        # Check health endpoint
        if curl -f http://localhost:3000/api/health &>/dev/null; then
            log "Health check: PASSED"
        else
            warn "Health check: FAILED"
        fi
    else
        warn "Service is not running"
    fi
}

# Show logs
logs() {
    info "Showing service logs..."
    docker-compose logs -f --tail=100
}

# Check health
check_health() {
    info "Checking server health..."
    
    max_attempts=30
    attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f http://localhost:3000/api/health &>/dev/null; then
            log "Server is healthy and ready!"
            return 0
        fi
        
        info "Attempt $attempt/$max_attempts - Server not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    error "Server failed to become healthy within expected time"
    return 1
}

# Update the service
update() {
    log "Updating BackstopJS Visual Regression Testing Server..."
    
    # Pull latest changes (if using git)
    if [ -d ".git" ]; then
        git pull origin main
    fi
    
    # Rebuild and restart
    build
    restart
    
    log "Update completed successfully"
}

# Backup data
backup() {
    log "Creating backup..."
    
    backup_dir="backups/$(date +'%Y%m%d_%H%M%S')"
    mkdir -p $backup_dir
    
    # Backup backstop_data
    if [ -d "backstop_data" ]; then
        cp -r backstop_data $backup_dir/
        log "Backstop data backed up to $backup_dir"
    fi
    
    # Backup uploads
    if [ -d "uploads" ]; then
        cp -r uploads $backup_dir/
        log "Uploads backed up to $backup_dir"
    fi
    
    log "Backup completed: $backup_dir"
}

# Clean up old data
cleanup() {
    log "Cleaning up old data..."
    
    # Remove old backups (older than 7 days)
    find backups -type d -mtime +7 -exec rm -rf {} + 2>/dev/null || true
    
    # Clean up Docker
    docker system prune -f
    
    log "Cleanup completed"
}

# Show help
help() {
    echo "BackstopJS Visual Regression Testing Server Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build     Build Docker image"
    echo "  start     Start the server"
    echo "  stop      Stop the server"
    echo "  restart   Restart the server"
    echo "  status    Check server status"
    echo "  logs      Show server logs"
    echo "  update    Update and restart server"
    echo "  backup    Backup server data"
    echo "  cleanup   Clean up old data"
    echo "  health    Check server health"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start          # Start the server"
    echo "  $0 logs           # View logs"
    echo "  $0 status         # Check if running"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        build)
            build
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        status)
            status
            ;;
        logs)
            logs
            ;;
        update)
            update
            ;;
        backup)
            backup
            ;;
        cleanup)
            cleanup
            ;;
        health)
            check_health
            ;;
        help|--help|-h)
            help
            ;;
        *)
            error "Unknown command: $1"
            help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 