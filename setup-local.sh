#!/bin/bash

# =============================================================================
# VENDORA ECOMMERCE - LOCAL SETUP SCRIPT
# =============================================================================
# This script sets up your local development environment

set -e

echo "🛠️  Vendora eCommerce - Local Setup"
echo "==================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the Vendora project directory."
    exit 1
fi

print_status "Found package.json"

# Step 1: Install dependencies
echo ""
print_info "Step 1: Installing dependencies..."
npm install
print_status "Dependencies installed"

# Step 2: Set up environment variables
echo ""
print_info "Step 2: Setting up environment variables..."

if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    print_status "Created .env.local from .env.example"
    print_warning "Please edit .env.local with your actual values"
else
    print_warning ".env.local already exists - skipping copy"
fi

# Step 3: Build check
echo ""
print_info "Step 3: Testing build process..."
if npm run build:client; then
    print_status "Build successful"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Step 4: Start development server
echo ""
print_status "🎉 Setup complete!"
echo ""
print_info "To start development:"
echo "  npm run dev:client"
echo ""
print_info "To build for production:"
echo "  npm run build:client"
echo ""
print_info "Environment configuration:"
echo "  Edit .env.local for local settings"
echo "  See .env.example for all available options"
echo ""
print_warning "Next steps:"
echo "1. Edit .env.local with your API keys and settings"
echo "2. Run 'npm run dev:client' to start development"
echo "3. Open http://localhost:3000"
echo ""

read -p "Start development server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting development server..."
    npm run dev:client
fi