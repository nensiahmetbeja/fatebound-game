# Google Sheets Email Collection Setup

This guide will help you set up Google Sheets to collect email signups from your FATEBOUND landing page.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "FATEBOUND Email Signups" (or whatever you prefer)
4. In Row 1, add the following headers:
   - **A1:** `Email`
   - **B1:** `Timestamp`
   - **C1:** `User Agent`

Your sheet should look like this:

```
| Email | Timestamp | User Agent |
|-------|-----------|------------|
```

## Step 2: Add Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of `google-apps-script.js` from your project
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
6. Name your project "FATEBOUND Email Handler" (optional)

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description:** "Email collection endpoint" (optional)
   - **Execute as:** Select **"Me"** (your Google account)
   - **Who has access:** Select **"Anyone"**
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to FATEBOUND Email Handler (unsafe)**
   - Click **Allow**
7. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)

## Step 4: Configure Your Next.js App

1. In your project root, create a file named `.env.local`
2. Add the following line with your Web app URL:

```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual URL you copied in Step 3.

**Important:** The `.env.local` file is already in `.gitignore`, so it won't be committed to Git.

## Step 5: Test Locally

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)
3. Submit a test email
4. Check your Google Sheet - you should see a new row with:
   - The email address
   - Timestamp
   - User agent information

## Step 6: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Key:** `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - **Value:** Your Google Apps Script URL
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**
6. Redeploy your site (or push a new commit to trigger automatic deployment)

### Option B: Using Vercel CLI

```bash
vercel env add NEXT_PUBLIC_GOOGLE_SCRIPT_URL
# Paste your Google Apps Script URL when prompted
# Select: Production, Preview, Development
```

Then deploy:
```bash
vercel --prod
```

## Viewing Your Collected Emails

Simply open your Google Sheet at any time to see all collected emails. You can:

- **Export to CSV:** File → Download → Comma Separated Values (.csv)
- **Sort/Filter:** Use Google Sheets built-in sorting and filtering
- **Share with team:** Click "Share" button to give access to team members
- **Create charts:** Use Google Sheets to visualize signup trends over time

## Duplicate Detection

The script automatically prevents duplicate email submissions. If someone tries to sign up with an email that's already in the sheet, it will silently reject the duplicate.

## Troubleshooting

### Emails not appearing in sheet?

1. Check that your `.env.local` file exists and has the correct URL
2. Verify the URL format: `https://script.google.com/macros/s/.../exec`
3. Make sure you restarted your dev server after adding `.env.local`
4. Check browser console for any errors (press F12 → Console tab)

### "Authorization required" error?

Re-deploy your Google Apps Script and make sure:
- Execute as: **"Me"**
- Who has access: **"Anyone"**

### Want to test the endpoint directly?

You can test it with curl:

```bash
curl -X POST "YOUR_GOOGLE_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","timestamp":"2025-01-01T00:00:00Z","userAgent":"Test"}'
```

Check your Google Sheet - a new row should appear.

## Privacy & Data Storage

- Emails are stored in your personal Google Sheet
- Only you (and people you explicitly share the sheet with) can access the data
- Google Apps Script runs under your Google account
- Consider adding a privacy policy link to your landing page

## Next Steps

- **Email Marketing:** Export the CSV and import to Mailchimp, ConvertKit, or your preferred email service
- **Automated Emails:** Extend the Google Apps Script to send automated confirmation emails
- **Analytics:** Use Google Sheets formulas to track signup trends

---

**Need help?** Check the [Google Apps Script documentation](https://developers.google.com/apps-script) or open an issue in the project repo.
