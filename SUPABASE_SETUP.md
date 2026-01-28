# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from Settings > API

## 2. Setup Database Schema

1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the content from `supabase/schema.sql`
3. Run the SQL to create tables, indexes, and policies

## 3. Seed Initial Data (Optional)

1. Copy and paste the content from `supabase/seed.sql`
2. Run the SQL to insert sample data

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`
2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_USE_SUPABASE=true
   VITE_ADMIN_PASSWORD=your_admin_password
   ```

## 5. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 6. Database Structure

### Tables:
- **profiles**: User profile information
- **portfolio_data**: Complex portfolio data (experience, projects, skills, etc.) stored as JSONB
- **testimonials**: Client testimonials with ratings
- **blog_posts**: Blog articles with metadata
- **gallery**: Project images with categories

### Features:
- Row Level Security (RLS) enabled
- Public read access for portfolio display
- Authenticated write access for admin operations
- Automatic timestamps with triggers
- Optimized indexes for performance

## 7. Usage

The application automatically detects if Supabase is configured:
- If `VITE_USE_SUPABASE=true` and credentials are valid: Uses Supabase
- If Supabase fails or is disabled: Falls back to localStorage
- Admin dashboard works with both storage methods

## 8. Data Migration

To migrate existing localStorage data to Supabase:
1. Export data from admin dashboard
2. Enable Supabase in environment variables
3. Import data through admin dashboard
4. Data will be automatically saved to Supabase