# Linkify Clone - Link Management SaaS Platform

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


## Linkify Clone — Quick Summary

This project is a Link-in-Bio app that collects click and visit analytics for user links. This README focuses on the essentials: signing up on Vercel, customizing your profile, adding links to track, and how tracking works.

### Key steps (short)
- Sign up for a Vercel account and deploy this project on Vercel.
- Open the deployed app, sign in, and customize your profile.
- Add the links you want to track from your Dashboard (New Link).
- When people view your public profile or click a link, the app records those events and shows analytics in your Dashboard.

## Step-by-step (concise)

1) Create a Vercel account
- Go to https://vercel.com/ and sign up or log in (GitHub/GitLab/Email).
- Connect this repository and deploy the project so the site is live.

2) Open the app and sign in
- Visit the URL Vercel gives you after deploy.
- Sign up or sign in inside the app to access your Dashboard.

3) Customize your profile
- Go to Settings or Customize in your Dashboard.
- Add a profile picture, display name, colors, and other customization options for your public page.

4) Add links to track
- In the Dashboard click "New Link" and paste the URL(s) you want to track.
- Reorder, enable/disable, or edit links as needed.

5) What tracking does
- The app records events when visitors view your public profile or click a tracked link (clicks, visits, and metadata).
- Events are collected and processed into analytics (click counts, unique visitors, referrers, country, etc.).
- You can view real-time or aggregated reports on your Dashboard.

## Important notes
- A Vercel account and a successful deploy on Vercel are required for authentication and tracking to work correctly.
- For deeper analytics (Tinybird / Convex), ensure required environment variables are configured on Vercel (e.g. Convex, Clerk, Tinybird keys).

## Quick troubleshooting
- No data in Dashboard: verify the app is deployed and environment variables are set in Vercel.
- Links not tracked: make sure links were added in Dashboard and the public profile is published.

