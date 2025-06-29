#!/bin/bash

echo "🚀 TestPortal Deployment Script for Vercel"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}This script will help you deploy your TestPortal to Vercel${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI is not installed. Please install it first:${NC}"
    echo "npm install -g vercel"
    echo ""
    echo "Then run: vercel login"
    exit 1
fi

echo -e "${GREEN}✓ Vercel CLI is installed${NC}"

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}You are not logged in to Vercel. Please run:${NC}"
    echo "vercel login"
    exit 1
fi

echo -e "${GREEN}✓ Logged in to Vercel${NC}"
echo ""

echo -e "${YELLOW}Deployment Options:${NC}"
echo "1. Deploy Backend only"
echo "2. Deploy Admin Frontend only"
echo "3. Deploy User Portal Frontend only"
echo "4. Deploy All (recommended approach)"
echo ""

read -p "Choose an option (1-4): " choice

case $choice in
    1)
        echo -e "${YELLOW}Deploying Backend...${NC}"
        cd backend
        vercel --prod
        ;;
    2)
        echo -e "${YELLOW}Deploying Admin Frontend...${NC}"
        cd frontend
        vercel --prod
        ;;
    3)
        echo -e "${YELLOW}Deploying User Portal Frontend...${NC}"
        cd user-portal-frontend
        vercel --prod
        ;;
    4)
        echo -e "${YELLOW}Deploying All Components...${NC}"
        echo ""
        echo -e "${YELLOW}Step 1: Deploying Backend${NC}"
        cd backend
        vercel --prod
        echo ""
        
        echo -e "${YELLOW}Step 2: Deploying Admin Frontend${NC}"
        cd ../frontend
        vercel --prod
        echo ""
        
        echo -e "${YELLOW}Step 3: Deploying User Portal Frontend${NC}"
        cd ../user-portal-frontend
        vercel --prod
        ;;
    *)
        echo -e "${RED}Invalid option. Please run the script again.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Deployment completed!${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Set up environment variables in your Vercel dashboard"
echo "2. Configure your MongoDB database"
echo "3. Update API URLs in your frontend applications"
echo "4. Test your deployed application"
echo ""
echo -e "${YELLOW}For detailed instructions, see: DEPLOYMENT.md${NC}" 