# 🔗 Linkify Clone - Link Management SaaS Platform

A modern, full-featured Link-in-Bio platform similar to Linktree, built with cutting-edge technologies for scalability and performance.

## ✨ Features

- 🎨 **Customizable Profile Pages** - Personalize your link-in-bio page with custom themes, colors, and profile pictures
- 📊 **Advanced Analytics** - Track link clicks, unique visitors, and geographic performance with Tinybird integration
- 🔐 **Secure Authentication** - User management powered by Clerk with protected routes
- 📱 **Mobile-First Design** - Responsive design optimized for all devices
- 🎯 **Drag & Drop Link Management** - Easily reorder links with intuitive interface
- 🌐 **Custom Usernames** - Claim personalized URLs (yoursite.com/u/username)
- ⚡ **Real-time Updates** - Instant synchronization using Convex real-time database
- 🔄 **Link Click Tracking** - Detailed analytics on link performance and user engagement

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TailwindCSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety throughout the application
- **Lucide React** - Modern icon library
- **@dnd-kit** - Drag and drop functionality

### Backend & Database
- **Convex** - Real-time backend as a service
- **Clerk** - Authentication and user management
- **Tinybird** - Real-time analytics and data processing
- **Vercel Functions** - Serverless API endpoints

### Analytics & Monitoring
- **Tinybird Pipes** - Real-time data transformation
- **Link Click Tracking** - Custom analytics implementation
- **Geographic Analytics** - Country-based performance tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account
- Clerk account
- Tinybird account (for analytics)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd linkify-clone
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=your-convex-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# Tinybird Analytics
TINYBIRD_HOST=https://api.tinybird.co
TINYBIRD_TOKEN=your-tinybird-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Setup Services

#### Convex Setup
```bash
# Install Convex CLI
npm install -g convex

# Login to Convex
npx convex login

# Initialize and deploy
npx convex dev
```

#### Clerk Setup
1. Create a new application in [Clerk Dashboard](https://dashboard.clerk.com/)
2. Configure social providers (Google, GitHub, etc.)
3. Set up JWT templates in Clerk:
   - Go to JWT Templates
   - Create a new template named "convex"
   - Add the following claims:
   ```json
   {
     "aud": "convex",
     "sub": "{{user.id}}"
   }
   ```
4. Add the Issuer URL to your Convex deployment environment variables

#### Tinybird Setup
1. Create account at [Tinybird](https://tinybird.co/)
2. Create a new workspace
3. Push the data sources and pipes:
```bash
cd tinybird
tb push datasources/*.datasource
tb push pipes/*.pipe
tb push materializations/*.pipe
```

### 4. Run the Application

```bash
# Development (runs both frontend and backend)
npm run dev

# Or run separately
npm run dev:frontend  # Next.js on port 3000
npm run dev:backend   # Convex development server
```

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```
linkify-clone/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Protected admin routes
│   │   └── dashboard/            # Dashboard pages
│   ├── (public)/                 # Public routes
│   │   └── u/[username]/         # Public profile pages
│   └── api/                      # API routes
├── components/                   # React components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── CreateLinkForm.tsx        # Link creation form
│   ├── CustomizationForm.tsx     # Profile customization
│   ├── DashboardMetrics.tsx      # Analytics dashboard
│   ├── LinkAnalytics.tsx         # Link performance charts
│   ├── ManageLinks.tsx           # Link management interface
│   └── PublicPageContent.tsx     # Public profile renderer
├── convex/                       # Convex backend
│   ├── lib/                      # Business logic
│   ├── schema.ts                 # Database schema
│   └── auth.config.ts            # Authentication config
├── lib/                          # Utility functions
│   ├── analytics.ts              # Analytics helpers
│   ├── analytics-server.ts       # Server-side analytics
│   └── types.ts                  # TypeScript types
└── tinybird/                     # Analytics infrastructure
    ├── datasources/              # Data source definitions
    ├── pipes/                    # Data transformation pipes
    └── materializations/         # Materialized views
```

## 🔧 Configuration

### Database Schema
The application uses Convex with the following main tables:
- `usernames` - Custom username mappings
- `links` - User's links with ordering
- `userCustomizations` - Profile customization settings

### Analytics Pipeline
Tinybird handles analytics with:
- `link_clicks` - Raw click data
- `daily_link_performance_materialized` - Aggregated daily metrics
- Real-time pipes for fast queries

## 🚢 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform:
- Convex production deployment URL
- Clerk production keys
- Tinybird production API key

### Post-Deployment Setup
1. Update Clerk redirect URLs
2. Configure Convex production environment
3. Set up Tinybird production workspace
4. Test analytics pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Routes

- `POST /api/track-click` - Track link clicks for analytics
- Protected routes under `/dashboard/*` require authentication

## 🔒 Security

- All admin routes protected by Clerk middleware
- JWT token validation for API endpoints
- CORS configuration for external requests
- Input validation with Zod schemas

## 📊 Analytics Features

- **Real-time Metrics** - Live click tracking and user engagement
- **Geographic Analytics** - Country-based performance insights
- **Link Performance** - Individual link analytics and comparisons
- **Dashboard Metrics** - Comprehensive overview of profile performance

## 🐛 Troubleshooting

### Common Issues

1. **Convex Connection Error**
   - Ensure `CONVEX_DEPLOYMENT` is correctly set
   - Run `npx convex dev` to sync schema

2. **Clerk Authentication Issues**
   - Verify JWT template configuration
   - Check redirect URLs in Clerk dashboard

3. **Analytics Not Working**
   - Confirm Tinybird API key is valid
   - Ensure data sources are properly pushed

## 📚 Documentation

- [Convex Documentation](https://docs.convex.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tinybird Documentation](https://docs.tinybird.co/)
