# Deployment Guide

This guide covers various deployment options for the Vendora eCommerce template.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vendora-ecommerce)

1. **One-click deploy**: Click the button above
2. **Configure**: Add environment variables in Vercel dashboard
3. **Done**: Your site will be live in minutes

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/vendora-ecommerce)

1. Click the deploy button
2. Configure build settings:
   - Build command: `npm run build:client`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Configure all required environment variables
- [ ] Set up database connection
- [ ] Configure authentication secrets
- [ ] Add payment gateway credentials (if using)

### 2. Build Verification
```bash
npm run build       # Verify build works
npm run start       # Test production build locally
npm run lint        # Check for linting errors
npm run type-check  # Verify TypeScript
```

### 3. Security Review
- [ ] Remove any debug console.logs
- [ ] Verify no secrets in code
- [ ] Check CORS configuration
- [ ] Validate input sanitization
- [ ] Review authentication flows

## 🌐 Platform-Specific Guides

### Vercel Deployment

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login and deploy**:
```bash
vercel login
vercel --prod
```

3. **Environment Variables**:
Add these in Vercel Dashboard → Project → Settings → Environment Variables:
```
NEXT_PUBLIC_APP_NAME=Vendora
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
JWT_SECRET=your-production-secret
MONGODB_URI=your-mongodb-connection-string
```

### Netlify Deployment

1. **Build Settings**:
```toml
[build]
  command = "npm run build:client"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
```

2. **Redirects** (create `public/_redirects`):
```
/*    /index.html   200
```

### Railway Deployment

1. **Connect GitHub**: Link your repository
2. **Configure**: Set environment variables
3. **Deploy**: Automatic deployment on push

### Heroku Deployment

1. **Create Heroku app**:
```bash
heroku create your-app-name
```

2. **Configure buildpacks**:
```bash
heroku buildpacks:set heroku/nodejs
```

3. **Set environment variables**:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
```

4. **Deploy**:
```bash
git push heroku main
```

### Docker Deployment

1. **Create Dockerfile**:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:client

EXPOSE 3000
CMD ["npm", "start"]
```

2. **Build and run**:
```bash
docker build -t vendora .
docker run -p 3000:3000 vendora
```

## 🔧 Production Configuration

### Environment Variables

Required for production:
```bash
# Application
NEXT_PUBLIC_APP_NAME=Vendora
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vendora

# Authentication
JWT_SECRET=super-secure-secret-key-here
JWT_EXPIRES_IN=7d

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Optional: Payment
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Configure image domains in `next.config.js`

2. **Bundle Analysis**:
```bash
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

3. **Caching Strategy**:
   - Configure CDN caching headers
   - Use service workers for offline support

### Security Headers

Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 📊 Monitoring & Analytics

### Error Tracking
- Set up Sentry for error monitoring
- Configure error boundaries in React

### Performance Monitoring
- Use Vercel Analytics
- Set up Google Analytics
- Monitor Core Web Vitals

### Uptime Monitoring
- Set up monitoring with services like:
  - Uptime Robot
  - Pingdom
  - StatusCake

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow:
- Runs on every push to main
- Performs linting and type checking
- Builds the application
- Runs security audits
- Deploys to production

### Custom Deployment Script

Create `scripts/deploy.sh`:
```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Build the application
npm run build

# Run tests
npm run lint
npm run type-check

# Deploy
vercel --prod

echo "✅ Deployment complete!"
```

## 🆘 Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (requires 18+)
2. **Environment variables**: Ensure all required vars are set
3. **Database connection**: Verify MongoDB URI and permissions
4. **Memory issues**: Increase Node.js memory limit if needed

### Getting Help

- Check the [troubleshooting guide](README.md#troubleshooting)
- Search existing [GitHub issues](https://github.com/yourusername/vendora-ecommerce/issues)
- Create a new issue with deployment details

---

**Need help?** Contact us at support@vendora.com