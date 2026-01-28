<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Rpi4ZKUm_3-KZrKLeDGYyXSJJh1IxD-y

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy the environment file:
   `cp .env.example .env.local`
3. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
4. Set the `VITE_ADMIN_PASSWORD` in [.env.local](.env.local) to your desired admin password
5. Run the app:
   `npm run dev`

## Security Notes

- Admin password is now stored in environment variables instead of hardcoded in source code
- The `.env.local` file is ignored by git to prevent accidental exposure of sensitive data
- For production deployment, ensure environment variables are properly configured
