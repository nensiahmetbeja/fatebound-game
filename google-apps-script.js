/**
 * Google Apps Script for FATEBOUND Email Collection
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Add headers in row 1: Email | Timestamp | User Agent
 * 3. Go to Extensions > Apps Script
 * 4. Paste this entire script
 * 5. Click Deploy > New Deployment (or Manage Deployments if updating)
 * 6. Select "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Click Deploy and copy the Web App URL
 * 10. Add the URL to your .env.local file as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 *
 * IMPORTANT: After updating this script, you must create a NEW deployment
 * or update the existing deployment version for changes to take effect!
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = data.timestamp || new Date().toISOString();
    const userAgent = data.userAgent || 'Unknown';

    // Validate email exists
    if (!email) {
      return createJsonResponse({
        status: 'error',
        message: 'Email is required'
      });
    }

    // Check if sheet has headers, if not add them
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.appendRow(['Email', 'Timestamp', 'User Agent']);
    }

    // Check if email already exists (to prevent duplicates)
    if (lastRow > 1) {
      const existingEmails = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      const emailExists = existingEmails.some(row => row[0] === email);

      if (emailExists) {
        return createJsonResponse({
          status: 'error',
          message: 'Email already registered'
        });
      }
    }

    // Append the new row with email, timestamp, and user agent
    sheet.appendRow([email, timestamp, userAgent]);

    // Return success response
    return createJsonResponse({
      status: 'success',
      message: 'Email successfully registered',
      email: email
    });

  } catch (error) {
    // Return detailed error response
    return createJsonResponse({
      status: 'error',
      message: error.toString(),
      stack: error.stack || 'No stack trace available'
    });
  }
}

// Optional: Function to get all emails (for testing)
// Visit the script URL in browser to see all collected emails
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    return createJsonResponse({
      status: 'success',
      count: data.length - 1,
      data: data,
      sheetName: sheet.getName()
    });

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: error.toString(),
      stack: error.stack || 'No stack trace available'
    });
  }
}

// Helper function to create JSON response with CORS headers
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
