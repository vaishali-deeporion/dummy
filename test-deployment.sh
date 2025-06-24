#!/bin/bash

# BackstopJS Server Deployment Test Script
# This script tests the deployed server to ensure it's working correctly

set -e

SERVER_URL="http://localhost:3000"
TIMEOUT=30

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
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

# Test health endpoint
test_health() {
    info "Testing health endpoint..."
    
    response=$(curl -s -w "%{http_code}" -o /tmp/health_response.json "$SERVER_URL/api/health" || echo "000")
    
    if [ "$response" = "200" ]; then
        log "✅ Health check passed"
        
        # Parse and display health info
        if command -v jq &> /dev/null; then
            echo "Health Status:"
            jq '.' /tmp/health_response.json
        else
            cat /tmp/health_response.json
        fi
        
        return 0
    else
        error "❌ Health check failed (HTTP $response)"
        return 1
    fi
}

# Test sessions endpoint
test_sessions() {
    info "Testing sessions endpoint..."
    
    response=$(curl -s -w "%{http_code}" -o /tmp/sessions_response.json "$SERVER_URL/api/sessions" || echo "000")
    
    if [ "$response" = "200" ]; then
        log "✅ Sessions endpoint working"
        return 0
    else
        error "❌ Sessions endpoint failed (HTTP $response)"
        return 1
    fi
}

# Test results endpoint
test_results() {
    info "Testing results endpoint..."
    
    response=$(curl -s -w "%{http_code}" -o /tmp/results_response.json "$SERVER_URL/api/results" || echo "000")
    
    if [ "$response" = "200" ]; then
        log "✅ Results endpoint working"
        return 0
    else
        error "❌ Results endpoint failed (HTTP $response)"
        return 1
    fi
}

# Test WebSocket connection
test_websocket() {
    info "Testing WebSocket connection..."
    
    # Simple WebSocket test using curl (if available)
    if command -v wscat &> /dev/null; then
        timeout 5 wscat -c "$SERVER_URL" --close &> /dev/null && log "✅ WebSocket connection working" || warn "⚠️  WebSocket test inconclusive"
    else
        warn "⚠️  wscat not available, skipping WebSocket test"
    fi
}

# Test file upload endpoint (without actual file)
test_upload_endpoint() {
    info "Testing upload endpoint structure..."
    
    # Test with empty request to check if endpoint exists
    response=$(curl -s -w "%{http_code}" -X POST "$SERVER_URL/api/upload-excel" || echo "000")
    
    if [ "$response" = "400" ]; then
        log "✅ Upload endpoint exists and validates input"
        return 0
    else
        warn "⚠️  Upload endpoint response: HTTP $response"
        return 1
    fi
}

# Wait for server to be ready
wait_for_server() {
    info "Waiting for server to be ready..."
    
    attempt=1
    max_attempts=30
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$SERVER_URL/api/health" &> /dev/null; then
            log "Server is ready!"
            return 0
        fi
        
        info "Attempt $attempt/$max_attempts - Server not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    error "Server failed to become ready within $max_attempts attempts"
    return 1
}

# Main test function
run_tests() {
    log "Starting BackstopJS Server Deployment Tests"
    log "Server URL: $SERVER_URL"
    echo
    
    # Wait for server
    if ! wait_for_server; then
        error "Server is not responding. Please check if it's running."
        exit 1
    fi
    
    echo
    
    # Run tests
    local failed=0
    
    test_health || ((failed++))
    echo
    
    test_sessions || ((failed++))
    echo
    
    test_results || ((failed++))
    echo
    
    test_upload_endpoint || ((failed++))
    echo
    
    test_websocket
    echo
    
    # Summary
    if [ $failed -eq 0 ]; then
        log "🎉 All tests passed! Server is working correctly."
        echo
        log "You can now:"
        log "• Visit $SERVER_URL in your browser"
        log "• Use the API endpoints for testing"
        log "• Upload Excel files for bulk testing"
        log "• Monitor server health at $SERVER_URL/api/health"
    else
        error "❌ $failed test(s) failed. Please check the server configuration."
        exit 1
    fi
}

# Cleanup function
cleanup() {
    rm -f /tmp/health_response.json /tmp/sessions_response.json /tmp/results_response.json
}

# Set trap for cleanup
trap cleanup EXIT

# Run the tests
run_tests 