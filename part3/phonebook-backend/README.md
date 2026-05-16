# Phonebook (Backend)

## Environment Variables

### Local Development (.env)
```
PORT=3001
NODE_ENV=development
FE_ORIGIN=http://localhost:5173
```

### Production (Render Dashboard)
- `NODE_ENV` = `production`
- `FE_ORIGIN` = Your frontend URL (e.g., https://your-app.onrender.com)

**Note:** Render automatically sets `PORT` to `10000` on the free tier.

## Deployment to Render

1. Connect your GitHub repository
2. Set Environment Variables in Render Dashboard (see above)
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Node Version: Use default (currently 24.15.0)