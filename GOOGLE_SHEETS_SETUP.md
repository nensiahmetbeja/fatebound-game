# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "FATEBOUND Email List" (or your preferred name)
4. In the first row, add headers: `Email`, `Timestamp`, `User Agent`
5. Share the sheet (you'll need this for the script)

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.js` in this directory
4. Save the script (Ctrl+S or Cmd+S)
5. Click **Deploy → New Deployment**
6. Click the gear icon next to "Select type" and choose **Web app**
7. Configure:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
8. Click **Deploy**
9. Copy the **Web app URL** - this is what you need for `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`

## Step 3: Authorize the Script

1. When you first run it, you'll need to authorize it
2. Click **Review Permissions**
3. Choose your Google account
4. Click **Advanced → Go to [Your Project Name] (unsafe)**
5. Click **Allow** to grant permissions

## Step 4: Configure Environment Variable

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following line:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual ID from your Google Apps Script Web App URL.

## Step 5: For Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value**: Your Google Apps Script Web App URL
   - **Environments**: Production, Preview, Development
4. Redeploy your application

## Testing

Once configured, test the integration:
1. Submit an email through the landing page form
2. Check your Google Sheet - you should see the email appear with timestamp and user agent
3. If it doesn't work, check the browser console for errors

## Troubleshooting

- **403 Error**: Make sure you've shared the Google Sheet and the script has proper permissions
- **404 Error**: Check that the Google Script URL is correct
- **CORS Error**: Make sure the Apps Script is deployed as a Web App with "Anyone" access

## Security Note

The Google Apps Script will be accessible to anyone who knows the URL, but it only allows specific operations (inserting emails). The script includes basic validation to prevent abuse.