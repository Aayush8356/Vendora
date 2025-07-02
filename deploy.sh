#!/bin/bash

# =============================================================================
# VENDORA ECOMMERCE - DEPLOYMENT SCRIPT
# =============================================================================
# This script helps you deploy Vendora eCommerce to GitHub and Vercel
# Make sure you have git and vercel CLI installed

set -e # Exit on any error

echo "🚀 Vendora eCommerce - Deployment Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install git first."
    exit 1
fi

print_status "Git is installed"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Make sure you're in the Vendora project directory."
    exit 1
fi

print_status "Found package.json - you're in the right directory"

# Step 1: Verify build works
echo ""
print_info "Step 1: Verifying build process..."
if npm run build:client; then
    print_status "Build successful"
else
    print_error "Build failed. Please fix build errors before deploying."
    exit 1
fi

# Step 2: Git setup
echo ""
print_info "Step 2: Setting up Git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    print_status "Git repository initialized"
else
    print_status "Git repository already exists"
fi

# Add all files
git add .
print_status "Files added to git"

# Check if there are changes to commit
if git diff --staged --quiet; then
    print_warning "No changes to commit"
else
    # Create commit
    git commit -m "feat: Vendora eCommerce - Production Ready

✨ Complete eCommerce solution featuring:
- Shopping cart & wishlist functionality  
- User authentication & profiles
- Product catalog with advanced search/filtering
- Admin dashboard with analytics
- Mobile-responsive premium design
- TypeScript + Next.js 15 + Tailwind CSS
- Framer Motion animations
- GitHub Actions CI/CD pipeline
- Production-ready configuration
- Comprehensive environment variable setup

🔧 Optimized for Vercel deployment
🚀 Ready for production use
🛡️ Security headers and best practices included"

    print_status "Commit created successfully"
fi

# Step 3: GitHub setup
echo ""
print_info "Step 3: GitHub Repository Setup"
print_warning "You need to create a GitHub repository manually:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Repository name: vendora-ecommerce"
echo "3. Make it public (or private if you prefer)"
echo "4. Don't initialize with README (we already have files)"
echo "5. Click 'Create repository'"
echo ""

read -p "Press Enter when you've created the GitHub repository..."

# Get GitHub username and repository URL
read -p "Enter your GitHub username: " github_username
github_url="https://github.com/${github_username}/vendora-ecommerce.git"

echo ""
print_info "Setting up remote origin: $github_url"

# Remove existing origin if it exists
git remote remove origin 2>/dev/null || true

# Add new origin
git remote add origin "$github_url"
print_status "Remote origin added"

# Set main branch and push
git branch -M main

echo ""
print_info "Pushing to GitHub..."
if git push -u origin main; then
    print_status "Successfully pushed to GitHub!"
    echo ""
    print_info "Your repository is now available at: $github_url"
else
    print_error "Failed to push to GitHub. Please check your repository URL and permissions."
    exit 1
fi

# Step 4: Vercel deployment instructions
echo ""
print_info "Step 4: Vercel Deployment"
print_warning "Now you can deploy to Vercel:"
echo ""
echo "🌐 OPTION 1: Vercel Dashboard (Recommended)"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'New Project'"
echo "3. Import from GitHub: $github_url"
echo "4. Framework will auto-detect as Next.js"
echo "5. Add environment variables (see DEPLOY_INSTRUCTIONS.md)"
echo "6. Click 'Deploy'"
echo ""

echo "🖥️  OPTION 2: Vercel CLI"
if command -v vercel &> /dev/null; then
    echo "Vercel CLI is installed. You can run:"
    echo "  vercel --prod"
    echo ""
else
    echo "Install Vercel CLI with:"
    echo "  npm i -g vercel"
    echo "Then run:"
    echo "  vercel --prod"
    echo ""
fi

# Step 5: Environment variables reminder
echo ""
print_info "Step 5: Environment Variables"
print_warning "Don't forget to set these REQUIRED environment variables in Vercel:"
echo ""
echo "NEXT_PUBLIC_APP_NAME=Vendora"
echo "NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app"
echo "NODE_ENV=production"
echo "SKIP_ENV_VALIDATION=true"
echo "VERCEL=1"
echo ""
print_info "For complete environment variables list, see:"
echo "- DEPLOY_INSTRUCTIONS.md (comprehensive guide)"
echo "- .env.example (template file)"

# Final success message
echo ""
print_status "🎉 Deployment setup complete!"
echo ""
print_info "Next steps:"
echo "1. Deploy to Vercel using one of the options above"
echo "2. Add environment variables in Vercel dashboard"
echo "3. Test your live application"
echo "4. Set up custom domain (optional)"
echo "5. Configure integrations (payments, email, etc.)"
echo ""
print_info "📚 For detailed instructions, read DEPLOY_INSTRUCTIONS.md"
print_info "🚀 Your Vendora eCommerce app is ready to go live!"

echo ""
echo "========================================"
echo "🎯 Repository: $github_url"
echo "📖 Instructions: DEPLOY_INSTRUCTIONS.md"
echo "🌐 Deploy at: https://vercel.com/dashboard"
echo "========================================"