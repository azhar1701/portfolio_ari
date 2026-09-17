<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Professional Portfolio & GIS Platform

Modern, responsive portfolio application built with React, TypeScript, Vite, and Tailwind CSS / CSS Modules, featuring interactive GIS Hub, project case studies, and dynamic content management.

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   `npm install`
2. Configure the environment:
   `cp .env.example .env.local`
3. Set the `VITE_ADMIN_PASSWORD` in `.env.local` to your desired admin password (and optionally configure Supabase credentials)
4. Run the app:
   `npm run dev`

## Security Notes

- Admin password is now stored in environment variables instead of hardcoded in source code
- The `.env.local` file is ignored by git to prevent accidental exposure of sensitive data
- For production deployment, ensure environment variables are properly configured
