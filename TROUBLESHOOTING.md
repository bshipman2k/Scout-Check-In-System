# Troubleshooting Guide - Scout Check-In System

## Common Issues and Solutions

### 1. "Please reload the page to try again" Error During Deployment

**This is the most common deployment error.** Here are solutions in order of likelihood:

#### Solution A: Check if Spreadsheet is in Shared Drive (MOST COMMON CAUSE!)

**⚠️ Apps Script deployment often fails in Shared Drives (Team Drives)!**

If your spreadsheet is in a Shared Drive, this is likely your problem.

**How to check:**
1. Look at the left side of your Google Sheet
2. If you see "Shared drives" in the folder path → **This is your problem!**
3. If you see "My Drive" → You're OK, skip to Solution B

**Why it fails:**
- Shared Drives have different permission models
- Apps Script deployments need ownership rights
- "Execute as: Me" doesn't work the same way in Shared Drives

**THE FIX - Move to My Drive:**

1. **Make a copy in your personal Drive:**
   - File → Make a copy
   - In the dialog, **uncheck** "Share it with the same people"
   - **Important:** Make sure destination is "My Drive" (not Shared drives)
   - Click "Make a copy"

2. **Work with the new copy:**
   - Close the original spreadsheet
   - Open the copy from your My Drive
   - Go to Extensions → Apps Script
   - Copy all your code files again
   - Save
   - Run initializeSpreadsheet to authorize
   - Try deployment now - **should work!**

3. **After deployment works:**
   - You can share the My Drive version with your team
   - File → Share → Add people
   - They can view/edit the spreadsheet
   - Only YOU (the owner) can deploy the Apps Script

**Alternative if you MUST use Shared Drive:**
- See GOOGLE_FORMS_WORKAROUND.md for a solution that works in Shared Drives
- Or contact your Google Workspace admin to adjust permissions

---

#### Solution B: Save and Authorize First

1. **Save all files:**
   - Click the disk icon (💾) in Apps Script editor
   - Or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
   - Make sure you see "Last edit was X seconds ago"

2. **Run a function manually to trigger authorization:**
   - At the top of the editor, find the function dropdown (shows "Select function")
   - Select `initializeSpreadsheet`
   - Click the "Run" button (▶️ play icon)
   - You'll be prompted to authorize - click "Review Permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to Scout Attendance System (unsafe)"
   - Click "Allow"
   - Wait for execution to complete (should see "Execution completed")

3. **Now try deployment:**
   - Click Deploy → New deployment
   - Should work now!

#### Solution B: Reload and Clear Cache

1. **Hard reload the Apps Script page:**
   - Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or close the tab completely and reopen

2. **Clear browser cache:**
   - Chrome: Settings → Privacy and Security → Clear browsing data
   - Select "Cached images and files"
   - Time range: Last hour
   - Click "Clear data"

3. **Try deployment again**

#### Solution C: Check File Structure

1. **Verify all files are created:**
   - You should see 8 files in the left sidebar:
     - Code.gs
     - Index.html
     - Registration.html
     - CheckIn.html
     - CheckOut.html
     - Dashboard.html
     - Stylesheet.html
     - JavaScript.html (if you created it)

2. **Verify Code.gs has the doGet function:**
   - Open Code.gs
   - First function should be `function doGet(e) {`
   - If missing, copy from the source file

3. **Save everything again**

#### Solution D: Try Incognito/Private Mode

1. Open a new Incognito/Private browser window
2. Go to your Google Sheet
3. Open Extensions → Apps Script
4. Try deployment in this clean session

#### Solution E: Check Google Apps Script Status

1. Visit: https://www.google.com/appsstatus
2. Check if Google Apps Script has any outages
3. If there's an outage, wait and try later

#### Solution F: Try Different Browser

1. **Try Google Chrome** (if not already using it)
   - Apps Script works best in Chrome
   - Download: https://www.google.com/chrome/

2. **Disable ALL browser extensions:**
   - Type: chrome://extensions
   - Turn off all extensions temporarily
   - Try deployment again

3. **Try a different device:**
   - Use a different computer if available
   - Some corporate networks block deployment

#### Solution G: Minimal Test Deployment

Sometimes deploying with fewer files works:

1. **Create a minimal test:**
   - Delete all HTML files temporarily (don't delete Code.gs!)
   - In Code.gs, simplify the doGet function:
   ```javascript
   function doGet(e) {
     return HtmlService.createHtmlOutput('<h1>Test</h1>');
   }
   ```
   - Save
   - Try deployment
   - If it works, gradually add back HTML files

2. **Once minimal version deploys:**
   - Go back to full Code.gs
   - Add HTML files one at a time
   - Deploy → Manage deployments → Edit → New version

#### Solution H: Use Test Deployment First

1. **Instead of "New deployment":**
   - Click Deploy → **Test deployments**
   - This creates a temporary deployment
   - Test it to make sure code works
   - Then try "New deployment" again

#### Solution I: Wait 24 Hours

**Sometimes Google's servers need time:**
- Save your work
- Close the browser completely
- Wait 24 hours
- Try again tomorrow
- (Sounds weird, but this has worked for many users!)

#### Solution J: Create New Google Account (Last Resort)

**If your account has restrictions:**

1. Check if you're using:
   - Work/school Google account
   - Account with restrictions
   - G Suite with admin controls

2. **Try with a personal Gmail account:**
   - Create new personal Gmail if needed
   - Create spreadsheet in new account
   - Follow setup from beginning
   - Share spreadsheet back to your main account when done

---

### Still Can't Deploy? Alternative Workaround

**If deployment absolutely won't work, here's a workaround:**

#### Option 1: Share the Spreadsheet Directly

1. **Instead of a web app**, families can access the sheet:
   - File → Share → Copy link
   - Set to "Anyone with the link can edit"
   - Share this link with families

2. **Create simple forms using Google Forms:**
   - Create separate Google Forms for:
     - Registration
     - Check-in
     - Check-out
   - Forms write to your spreadsheet tabs
   - Not as elegant, but works!

#### Option 2: Contact Google Support

1. Go to: https://support.google.com/docs/
2. Click "Contact us"
3. Describe the deployment error
4. They can check if your account has restrictions

#### Option 3: Hire Help

- Post on Fiverr or Upwork for "Google Apps Script deployment help"
- Many developers can help remotely for $20-50
- They can screen-share and troubleshoot live

---

### 2. Missing Headers After Running initializeSpreadsheet

**Cause:** You manually created the sheet tabs before running the function

**Solution:**
1. The function checks if sheets exist and skips them if they do
2. Delete all manually created sheets (Families, Events, etc.)
3. Keep the default "Sheet1" or any other unused sheet
4. Run `initializeSpreadsheet` again
5. The function will now create all 4 sheets with proper headers
6. Verify headers appear in Row 1 of each sheet

**Or manually add headers:** See MISSING_HEADERS_FIX.md

---

### 3. Blank White Screen When Opening a Page

**Causes:** JavaScript error, missing HTML files, or browser console error

**Solution A: Check Browser Console (Most Important!)**

1. **Open the web app page that's blank**
2. **Press F12** (or Right-click → Inspect)
3. **Click the "Console" tab**
4. **Look for RED error messages**

Common errors and fixes:

| Error Message | Fix |
|--------------|-----|
| "Stylesheet is not defined" | Missing Stylesheet.html file in Apps Script |
| "include is not defined" | Check Code.gs has the include() function |
| "Failed to load resource" | Redeploy: Deploy → Manage → Edit → New version |
| "Uncaught SyntaxError" | Check HTML file for typos/syntax errors |
| No errors shown | See Solution B below |

**Solution B: Verify All HTML Files Exist**

1. Go to Apps Script editor
2. Check left sidebar - you should see ALL these files:
   - ☐ Code.gs
   - ☐ Index.html
   - ☐ Registration.html
   - ☐ CheckIn.html
   - ☐ CheckOut.html
   - ☐ Dashboard.html ← **Check this one!**
   - ☐ Stylesheet.html

3. If Dashboard.html is missing:
   - Click + button next to Files
   - Select "HTML"
   - Name it "Dashboard"
   - Paste the Dashboard.html content from the source files
   - Save
   - Redeploy (Deploy → Manage deployments → Edit → New version)

**Solution C: Check the include() Function**

1. Open Code.gs
2. Scroll down to find this function (should be around line 35):

```javascript
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
```

3. If missing, add it after the doGet function
4. Save
5. Redeploy (new version)

**Solution D: Test with Simple HTML**

1. Temporarily edit Dashboard.html to be very simple:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <h1>Dashboard Test</h1>
  <p>If you see this, HTML is loading!</p>
</body>
</html>
```

2. Save
3. Redeploy (new version)
4. Visit the Dashboard page
5. If you see the test text:
   - Problem is in the complex Dashboard.html code
   - Restore original Dashboard.html
   - Check for JavaScript errors in console

**Solution E: Hard Refresh**

1. While on the blank page, press:
   - **Windows:** Ctrl + Shift + R
   - **Mac:** Cmd + Shift + R
2. This clears cached version
3. Page should reload fresh

**Solution F: Try Different Browser/Incognito**

1. Copy your Web App URL
2. Open Incognito/Private window
3. Paste URL and try Dashboard
4. If it works in incognito:
   - Clear your browser cache
   - Disable browser extensions
   - Try again in normal mode

---

### 4. "Authorization Required" During Deployment

**Expected behavior** - this is normal for first deployment.

**Solution:**
1. Click "Authorize access"
2. Select your Google account
3. Click "Advanced" → "Go to [project name] (unsafe)"
4. Click "Allow"
5. Continue with deployment

**Why "unsafe"?**
- Google shows this for any unverified script
- It's YOUR script, so it's safe
- This is normal for personal/organization scripts

---

### 3. Deployment Works But Web App Shows "Script function not found: doGet"

**Cause:** Code.gs file is missing or doGet function has syntax errors

**Solution:**
1. Open Code.gs
2. Verify first function is exactly:
   ```javascript
   function doGet(e) {
     var page = e.parameter.page || 'index';
     // ... rest of function
   }
   ```
3. Check for typos in function name (must be exactly `doGet`)
4. Save and redeploy (Deploy → Manage deployments → Edit → New version)

---

### 4. Web App URL Shows "Authorization needed"

**Solution:**
1. Visit the web app URL
2. Click "Authorize"
3. Sign in with the same Google account that owns the spreadsheet
4. Grant permissions
5. The app should now work

---

### 5. Families Can't Access Web App

#### Check Deployment Settings

1. Go to Deploy → Manage deployments
2. Click pencil icon (✏️) to edit
3. Verify settings:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. If wrong, update and click "Deploy"

#### Check URL

1. Make sure you're sharing the **Web App URL**, not the Apps Script editor URL
2. Web App URL looks like: `https://script.google.com/macros/s/AKfyc.../exec`
3. Apps Script URL looks like: `https://script.google.com/home/projects/...` ❌ Wrong!

---

### 6. Dashboard Shows "No events available"

**Cause:** Events sheet is empty

**Solution:**
1. Visit your web app
2. Go to Dashboard
3. Click "+ Create New Event"
4. Fill in event details
5. Click "Create Event"

**OR manually in spreadsheet:**
1. Open your Google Sheet
2. Go to "Events" tab
3. Add a row:
   - Event ID: EVT1234567890
   - Event Name: Spring 2026 Campout
   - Event Date: 2026-02-27
   - Location: Your campsite
   - Status: Active

---

### 7. Check-In Not Recording / Dashboard Not Updating

#### Verify Spreadsheet Connection

1. Open Code.gs
2. Check line: `var SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();`
3. This should automatically connect to your sheet

#### Manual Fix

1. In Code.gs, replace the SPREADSHEET_ID line with:
   ```javascript
   var SPREADSHEET_ID = 'YOUR_ACTUAL_SPREADSHEET_ID';
   ```
2. Get your spreadsheet ID from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`
3. Save and redeploy

#### Check Sheet Names

1. Verify sheet tabs are named exactly:
   - Families
   - FamilyMembers
   - Events
   - Attendance
2. Names are case-sensitive!

---

### 8. Search Not Finding Families

**Solution:**
1. Open your Google Sheet
2. Go to "Families" tab
3. Verify the family is listed
4. Check spelling of last name
5. If missing, manually add the family (see USER_GUIDE.md)

---

### 9. QR Code Not Working

#### Test the URL First

1. Copy your Web App URL
2. Paste into phone browser
3. If URL works, problem is with QR code
4. If URL doesn't work, problem is with deployment

#### Regenerate QR Code

1. Go to https://www.qr-code-generator.com/
2. Paste your Web App URL (the full URL ending in `/exec`)
3. Download new QR code
4. Test with phone camera

#### Alternative: Use Short URL

1. Go to https://bit.ly or https://tinyurl.com
2. Create short link for your Web App URL
3. Generate QR code from short URL
4. Easier to scan and type manually

---

### 10. Permissions Error: "You do not have permission to call..."

**Cause:** Script is trying to run as wrong user

**Solution:**
1. Deploy → Manage deployments
2. Click pencil icon (✏️)
3. Change "Execute as" to "Me"
4. Click "Deploy"
5. Reauthorize if prompted

---

### 11. Changes Not Appearing After Code Updates

**You must create a new deployment version!**

**Solution:**
1. Edit your code
2. Save (Ctrl+S)
3. Deploy → Manage deployments
4. Click pencil icon (✏️) on your existing deployment
5. **Version: New version** (important!)
6. Click "Deploy"

**Important:** The Web App URL stays the same, so you don't need to update your QR code!

---

### 12. Slow Performance / Timeout Errors

#### Optimize for Large Data

If you have 50+ families:

1. The system should still work fine
2. If slow, consider:
   - Archiving old events (move to separate sheet)
   - Clearing out test data
   - Using sheet filters instead of full scans

#### Check Internet Connection

1. Verify cell service at campsite
2. Test on mobile data, not just WiFi
3. Have paper backup ready

---

## Step-by-Step: Starting Fresh If Nothing Works

If you're completely stuck, start over:

1. **Create new Google Sheet**
   - Name: "Scout Attendance System v2"

2. **Open Apps Script**
   - Extensions → Apps Script

3. **Create files one at a time:**
   - Start with Code.gs
   - Copy content, paste, save
   - Wait 5 seconds between each file
   - Then add HTML files

4. **Save everything**
   - Click disk icon
   - Wait for "Saved" confirmation

5. **Run initializeSpreadsheet function**
   - Select from dropdown
   - Click Run button
   - Authorize permissions

6. **Try deployment**
   - Should work now!

---

## Getting Help

### Before Asking for Help, Have Ready:

1. **Exact error message** (screenshot is best)
2. **What you were doing** when error occurred
3. **Which browser** you're using (Chrome recommended)
4. **Have you authorized** the script?
5. **Can you access** the Google Sheet?

### Where to Get Help:

1. **Google Apps Script Community:**
   - https://support.google.com/docs/community

2. **Stack Overflow:**
   - Tag: google-apps-script
   - https://stackoverflow.com/questions/tagged/google-apps-script

3. **Your Pack's Developer:**
   - [Add contact info here]

---

## Prevention: Best Practices

1. **Always save before deploying**
2. **Test in incognito mode** before sharing with families
3. **Keep a backup** of your Code.gs file
4. **Document your Web App URL** in multiple places
5. **Test with a friend's phone** before the campout
6. **Have paper backup** at events

---

## Advanced Debugging: View Console Logs

If still stuck, check browser console for detailed errors:

1. **Open Developer Console:**
   - Chrome: Press `F12` or `Ctrl+Shift+I`
   - Look for "Console" tab

2. **Try deployment again** while console is open

3. **Look for red error messages:**
   - Take a screenshot
   - Search Google for the exact error
   - Or share screenshot with developer

4. **Common console errors and fixes:**
   - "Failed to fetch" → Network/firewall issue
   - "403 Forbidden" → Permission issue
   - "Script is disabled" → Apps Script API not enabled
   - "Quota exceeded" → Wait an hour, try again

---

## Is Your Spreadsheet in a Shared Drive?

**This is the #1 cause of deployment failures!**

- ✅ **My Drive** → Deployment should work
- ❌ **Shared drives** → Deployment will likely fail
- **Fix:** Make a copy to My Drive (see Solution A above)

---

## Quick Reference: Common Error Messages

| Error Message | Quick Fix |
|--------------|-----------|
| "Please reload the page to try again" | **CHECK IF IN SHARED DRIVE FIRST!** Then: Save files, run initializeSpreadsheet, deploy |
| "Authorization required" | Click Authorize, grant permissions |
| "Script function not found: doGet" | Check Code.gs has doGet function, save, redeploy |
| "You do not have permission..." | Deploy settings: Execute as "Me" |
| "Cannot find family" | Check Families sheet, verify spelling |
| "No events available" | Create event in Dashboard or manually in sheet |

---

**Still stuck?** Take a screenshot of the error and contact your Pack's volunteer developer.

**System ready for Spring 2026 Campout - February 27, 2026** 🏕️
