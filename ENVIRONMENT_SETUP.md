# Environment Variables Setup for Vercel

## Backend Environment Variables

Add these to your **Backend Vercel Project**:

### Required Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

### Optional Variables (for email functionality):
```
MAIL_USER_ID=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## Frontend Environment Variables

Add these to your **Frontend Vercel Projects**:

### Admin Frontend:
```
REACT_APP_API_URL=https://your-backend-project.vercel.app/api/v1
NODE_ENV=production
```

### User Portal Frontend:
```
REACT_APP_API_URL=https://your-backend-project.vercel.app/api/v1
NODE_ENV=production
```

## How to Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add each variable with its value
5. Select the appropriate environments (Production, Preview, Development)
6. Click "Save"

## MongoDB Atlas Setup:

1. Go to [MongoDB Atlas](https://mongodb.com)
2. Create a free account
3. Create a new cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Replace `<dbname>` with your database name

## Example MongoDB URI:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/testportal?retryWrites=true&w=majority
```

## Security Notes:

- Use a strong JWT secret (at least 32 characters)
- Never commit environment variables to your repository
- Use different secrets for development and production
- Consider using Vercel's built-in secrets management

## Testing Environment Variables:

You can test if your environment variables are working by:

1. Adding a test endpoint to your backend:
```javascript
app.get('/api/test-env', (req, res) => {
  res.json({
    mongodb: process.env.MONGODB_URI ? 'Set' : 'Not Set',
    jwt: process.env.JWT_SECRET ? 'Set' : 'Not Set',
    nodeEnv: process.env.NODE_ENV
  });
});
```

2. Visit `https://your-backend-url.vercel.app/api/test-env` to check 