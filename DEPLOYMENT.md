# TestPortal Deployment Guide for Vercel

This guide will help you deploy your TestPortal application to Vercel. The project consists of three main parts:
1. **Backend API** (Node.js/Express)
2. **Admin Frontend** (React)
3. **User Portal Frontend** (React)

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Database**: Set up a MongoDB database (MongoDB Atlas recommended)
3. **GitHub Repository**: Your code should be on GitHub

## Step 1: Backend Deployment

### 1.1 Deploy Backend to Vercel

1. **Fork/Clone your repository** to a new repository specifically for backend deployment
2. **Navigate to the backend directory** in your repository
3. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set the **Root Directory** to `backend`
   - Click "Deploy"

### 1.2 Configure Environment Variables

In your Vercel project settings, add these environment variables:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
JWT_SECRET=your-super-secret-jwt-key
MAIL_USER_ID=your-email@gmail.com
MAIL_PASSWORD=your-email-password
NODE_ENV=production
```

### 1.3 Update Configuration

The `backend/config/production.json` file is already set up to use these environment variables.

## Step 2: Frontend Deployments

### 2.1 Deploy Admin Frontend

1. **Create a new repository** for admin frontend deployment
2. **Copy the frontend directory** to this new repository
3. **Update API URLs** in your frontend code to point to your deployed backend
4. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import the admin frontend repository
   - Set the **Root Directory** to `frontend` (if needed)
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.vercel.app/api/v1`
   - Click "Deploy"

### 2.2 Deploy User Portal Frontend

1. **Create a new repository** for user portal frontend deployment
2. **Copy the user-portal-frontend directory** to this new repository
3. **Update API URLs** in your frontend code to point to your deployed backend
4. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import the user portal frontend repository
   - Set the **Root Directory** to `user-portal-frontend` (if needed)
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.vercel.app/api/v1`
   - Click "Deploy"

## Step 3: Update API URLs in Frontend Code

You'll need to update the API base URLs in your frontend applications. Look for files like:

- `frontend/src/services/Apis.js`
- `user-portal-frontend/src/helper/Apis.js`

Replace hardcoded localhost URLs with your deployed backend URL.

## Step 4: Database Setup

1. **MongoDB Atlas** (Recommended):
   - Create a free account at [mongodb.com](https://mongodb.com)
   - Create a new cluster
   - Get your connection string
   - Add it to your Vercel environment variables

2. **Local MongoDB** (For development):
   - Install MongoDB locally
   - Use the connection string: `mongodb://localhost:27017/Online-Exam-Portal`

## Step 5: Email Configuration

For email functionality, you can use:
- **Gmail SMTP** (for testing)
- **SendGrid** (for production)
- **Mailgun** (for production)

Update the `MAIL_USER_ID` and `MAIL_PASSWORD` environment variables accordingly.

## Deployment URLs

After deployment, you'll have three URLs:
- **Backend API**: `https://your-backend-project.vercel.app`
- **Admin Frontend**: `https://your-admin-frontend.vercel.app`
- **User Portal**: `https://your-user-portal.vercel.app`

## Troubleshooting

### Common Issues:

1. **CORS Errors**: The backend is already configured with CORS, but you might need to update the allowed origins
2. **Environment Variables**: Make sure all environment variables are set correctly in Vercel
3. **Build Errors**: Check the build logs in Vercel for any dependency issues
4. **Database Connection**: Ensure your MongoDB connection string is correct and the database is accessible

### Build Commands

If you encounter build issues, you can customize the build commands in Vercel:

**For Frontend:**
```bash
npm install && npm run build
```

**For Backend:**
```bash
npm install
```

## Alternative: Single Repository Deployment

If you want to deploy everything from a single repository, you can use the root `vercel.json` file, but you'll need to:

1. Set up proper routing
2. Configure build commands for each part
3. Handle environment variables for all services

## Support

If you encounter any issues during deployment, check:
1. Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Your application logs in Vercel dashboard
3. Network tab in browser for API errors

## Notes

- Vercel has a serverless function timeout limit (10 seconds for hobby plan)
- For heavy database operations, consider using a dedicated hosting service for the backend
- The free tier of Vercel has limitations on build minutes and bandwidth 