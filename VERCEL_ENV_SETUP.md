# Vercel Environment Variable Setup

## Quick Fix for Production Error

The error "Google Sheets integration not configured" means the environment variable isn't set in Vercel.

## Steps to Fix:

### 1. Add Environment Variable in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (fatebound-game)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add the following:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: Your Google Apps Script Web App URL (from the setup)
   - **Environments**: Check all three:
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
6. Click **Save**

### 2. Redeploy

After adding the environment variable:

**Option A - Automatic**: Push a new commit to trigger redeploy
```bash
git commit --allow-empty -m "Update: Add Google Sheets env var"
git push
```

**Option B - Manual**: 
- Go to **Deployments** tab in Vercel
- Click **⋮** (three dots) on the latest deployment
- Click **Redeploy**

### 3. Verify It Works

1. After redeploy, test the email form
2. Check your Google Sheet to see if the email appears
3. Check browser console for any errors

## Troubleshooting

### Still getting the error after redeploy?

1. **Verify the variable name is correct**:
   - Must be exactly: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - Case-sensitive

2. **Check the URL format**:
   - Should be: `https://script.google.com/macros/s/YOUR_ID/exec`
   - No trailing slash

3. **Check which environments it's set for**:
   - Make sure Production is checked
   - Preview and Development are optional but recommended

4. **Force a new deployment**:
   - Sometimes Vercel caches builds
   - Try making a small code change and pushing

5. **Check Vercel logs**:
   - Go to your deployment → **Functions** tab
   - Check the API route logs for errors

### Alternative: Use Non-Public Variable

For better security, you can use a non-public variable (but requires code change):

**In Vercel, use**: `GOOGLE_SCRIPT_URL` (without NEXT_PUBLIC_)

Then update `pages/api/submit-email.ts`:
```typescript
const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
```

This way it won't be exposed to the browser, but the current setup works fine too.
