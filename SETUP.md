# Scout Check-In System - Setup Guide

## Prerequisites

- A Google Account
- Access to Google Sheets and Google Drive
- About 30 minutes for initial setup

## Step 1: Create the Google Spreadsheet

⚠️ **IMPORTANT:** Create the spreadsheet in **My Drive**, NOT in a Shared Drive!

Apps Script deployment often fails in Shared Drives. You can share it with others after deployment.

1. Go to Google Sheets (sheets.google.com)
2. Create a new spreadsheet
3. Name it "Scout Attendance System"
4. **Verify it's in My Drive:**
   - Click the folder icon at the top
   - Make sure it shows "My Drive" (not "Shared drives")
   - If in wrong location, move it: File → Move → My Drive
5. **DO NOT manually create sheet tabs yet!**
   - The `initializeSpreadsheet` function will create them automatically
   - If you already created sheets, delete them before running the function
   - Just leave the default "Sheet1" for now

## Step 2: Set Up the Apps Script

1. In your spreadsheet, go to **Extensions → Apps Script**
2. Delete any default code in the editor
3. Create the following script files (use the + button next to Files):
   - **Code.gs** (already created by default)
   - **Index.html**
   - **Registration.html**
   - **CheckIn.html**
   - **CheckOut.html**
   - **Dashboard.html**
   - **Stylesheet.html**

4. Copy the contents from each file in this folder into the corresponding Apps Script file
   - **Important:** Copy one file at a time
   - Wait a few seconds between files
   - Make sure content is pasted correctly
   
5. **Save ALL files** - Click the disk icon (💾) and wait for "Saved" confirmation

6. **IMPORTANT - Run Initialization (creates headers and authorizes):**
   - At the top, find the function dropdown (shows "Select function")
   - Select `initializeSpreadsheet` from the dropdown
   - Click the **Run** button (▶️ play icon)
   - When prompted for authorization:
     - Click "Review Permissions"
     - Choose your Google account
     - Click "Advanced" → "Go to Scout Attendance System (unsafe)" *(This is normal for personal scripts)*
     - Click "Allow"
   - Wait for "Execution completed" message at the bottom
   
7. **VERIFY the sheets were created properly:**
   - Switch to your spreadsheet tab
   - You should see 4 sheet tabs at the bottom:
     - Families
     - FamilyMembers  
     - Events
     - Attendance
   - **Check that each sheet has HEADERS in row 1** (colored blue/purple)
   - If headers are missing:
     - You may have manually created sheets before running the function
     - Delete those sheets and run `initializeSpreadsheet` again
     - Or see "Manual Setup" below to add headers manually

### Manual Setup (If initializeSpreadsheet Didn't Work)

If you don't see the headers, add them manually:

**Families sheet - Row 1:**
```
Family ID | Last Name | Parent 1 Name | Parent 1 Phone | Parent 1 Email | Parent 2 Name | Parent 2 Phone | Parent 2 Email
```

**FamilyMembers sheet - Row 1:**
```
Family ID | Member Name | Member Type | Age
```

**Events sheet - Row 1:**
```
Event ID | Event Name | Event Date | Location | Status
```

**Attendance sheet - Row 1:**
```
Timestamp | Event ID | Family ID | Member Name | Action | Currently On Site | Notes
```

Then:
1. Select row 1 on each sheet
2. Make it bold (Ctrl+B)
3. Add background color (blue or purple recommended)
4. Add text color white (optional)

---

## Step 3: Deploy the Web App

1. In the Apps Script editor, click **Deploy → New deployment**
   - **If you get "Please reload the page to try again" error:**
     - Make sure you completed Step 2.6 (ran initializeSpreadsheet)
     - Press Ctrl+S to save again
     - Hard refresh the page: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
     - Try again
     - See TROUBLESHOOTING.md for more help

2. Click the gear icon next to "Select type" and choose **Web app**

3. Configure the deployment:
   - **Description**: "Scout Check-In System v1.0"
   - **Execute as**: Me (your email) ← **Important!**
   - **Who has access**: Anyone ← **Important!**

4. Click **Deploy**

5. If prompted again for authorization:
   - Click **Authorize access**
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"

6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/AKfyc.../exec`)
   - **Save this URL!** Write it down, email it to yourself
   - This is the link families will use
   - This is what you'll use for the QR code

## Step 4: Create the QR Code

1. Go to a free QR code generator like:
   - qr-code-generator.com
   - qr.io
   - or search "free QR code generator"
2. Paste your Web App URL
3. Generate and download the QR code
4. Print it large enough to be easily scanned (recommend 8.5" x 11" page)

## Step 5: Initial Configuration

1. Visit your Web App URL
2. Go to the "Admin" or "Dashboard" section
3. Create your first event:
   - Event Name: "Spring 2026 Campout"
   - Event Date: February 27, 2026
   - Location: [Your campsite name]

## Step 6: Family Registration

**Before the campout**, have families register:

1. Share the Web App URL with all families (via email or Pack newsletter)
2. Each family should:
   - Click "Register Family"
   - Enter parent/guardian information
   - Add all Scouts and siblings
   - Submit the registration

**Tip**: You can also register families manually in the "Families" sheet if needed.

## Step 7: Test the System

Before February 27:

1. Register a test family
2. Try checking in family members
3. Try checking out family members
4. View the dashboard to see current attendance
5. Verify all data is recording in your spreadsheet

## Step 8: Campout Day Setup

1. **Print the QR code** and post it prominently at the campsite entrance
2. **Have a backup**: Print a list of all registered families
3. **Designate a backup device**: Have a tablet or phone logged into the dashboard
4. **Brief your leaders**: Show Assistant Cubmasters and Committee Chair how to access the dashboard

## Usage During Campout

### For Families:

**Check-In**:
1. Scan the QR code when arriving
2. Search for your last name
3. S"Please reload the page to try again" Error
- **Most common issue!** See TROUBLESHOOTING.md Solution A
- Make sure you ran `initializeSpreadsheet` function first (Step 2.6)
- Save all files and hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### QR Code Not Working
- Make sure you copied the full Web App URL (ends with `/exec`)
- Test by visiting the URL directly in a browser first
- Try creating a bit.ly short link instead

### Families Can't Find Their Names
- Check the "Families" sheet to ensure they're registered
- Search is case-insensitive, but check spelling

### Data Not Appearing
- Refresh the page
- Check that the correct event is selected
- Verify the spreadsheet permissions
- Go to Dashboard and verify event was created

### Need to Make Changes After Deployment
- If you edit the Apps Script code, you must create a **new version**
- Go to Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy
- **Your Web App URL stays the same** - no need to update QR code!

### More Help
- See **TROUBLESHOOTING.md** for detailed solutions to all common issues
- Includes step-by-step fixes with screenshots

## Troubleshooting

### "Please reload the page to try again" Error
- **⚠️ FIRST: Check if your spreadsheet is in a Shared Drive!** This is the #1 cause!
  - If yes: Make a copy to My Drive (File → Make a copy)
  - See TROUBLESHOOTING.md Solution A for detailed steps
- Make sure you ran `initializeSpreadsheet` function first (Step 2.6)
- Save all files and hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- See TROUBLESHOOTING.md for 10+ more solutions

### QR Code Not Working
- Make sure you copied the full Web App URL
- Test by visiting the URL directly in a browser first

### Families Can't Find Their Names
- Check the "Families" sheet to ensure they're registered
- Search is case-insensitive, but check spelling

### Data Not Appearing
- Refresh the page
- Check that the correct event is selected
- Verify the spreadsheet permissions

### Need to Make Changes
- If you edit the Apps Script code, you must create a **new deployment** or manage an existing deployment
- Go to Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy

## Security Notes

- The Web App URL is public but doesn't contain sensitive info
- Only people with the link can access it
- All data is stored in your Google Sheet (only you can access)
- Consider the "Execute as: Me" setting means you authorize all actions

## Data Management

### After the Event:
1. Review the "Attendance" sheet
2. Verify everyone checked out
3. Archive the data or clear for next event

### Exporting Data:
- From the "Attendance" sheet, go to File → Download → CSV
- Keep records for your Pack's requirements

## Updates and Maintenance

If you need to update the app after deployment:
1. Edit the code in Apps Script editor
2. Save changes
3. Deploy → Manage deployments
4. Click the pencil icon on your deployment
5. Version: New version
6. Deploy

The Web App URL stays the same, so your QR code doesn't need to change!

## Support Contacts

- **Developer**: [Your name/email]
- **Cubmaster**: [Name/email]
- **Committee Chair**: [Name/email]

---

**Ready for Spring 2026 Campout - February 27, 2026**
