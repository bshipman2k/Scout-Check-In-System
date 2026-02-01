# User Guide - Scout Check-In System

## For Families

### First-Time Registration

**When:** Before your first campout  
**How long:** 5-10 minutes

1. Open the app URL (provided by your Pack leaders) or scan the QR code
2. Click "Register Family"
3. Fill in:
   - Your family last name
   - Parent/Guardian contact information (phone and email)
   - All family members who might attend (Scouts, siblings, parents)
4. Click "Register Family"
5. Save your Family ID for reference (though you can always search by last name)

**Tips:**
- Include everyone who *might* attend any campout
- You only need to do this once per year
- If you need to add someone later, contact your Pack leadership

---

### Checking In at a Campout

**When:** As soon as you arrive at the campsite  
**How long:** Less than 1 minute

1. Scan the QR code posted at the entrance (or use the saved URL)
2. Click "Check In"
3. Select the current event from the dropdown
4. Search for your family by last name
5. Select your family from the results
6. Check the boxes for everyone who just arrived
7. Click "Check In Selected"

**Example Scenarios:**

**Scenario 1:** Mom and one Scout arrive together
- Check the boxes for Mom and that Scout
- Click "Check In Selected"

**Scenario 2:** Dad and siblings arrive later
- Dad goes through the same process
- Checks boxes for himself and the siblings who just arrived
- The system tracks everyone separately

**Important:**
- Only check in people who are arriving RIGHT NOW
- If someone is already checked in, they won't appear again

---

### Checking Out

**When:** Anytime someone leaves the campsite  
**How long:** Less than 1 minute

**Types of Check-Outs:**
1. **Temporary** (store run, emergency, etc.)
2. **Final** (going home)

**How to Check Out:**

1. Scan the QR code or use the saved URL
2. Click "Check Out"
3. Select the event
4. Search for your family
5. Select your family from the results
6. Check the boxes for everyone who is leaving
7. (Optional) Add a note explaining why (e.g., "Store run - returning in 1 hour")
8. Click "Check Out Selected"

**Why This Matters:**
- In an emergency, leaders need to know EXACTLY who is on site
- If someone is checked out temporarily, they should check back in when they return

**Example Scenarios:**

**Scenario 1:** Dad needs to run to the store
- Dad checks out himself (and any kids going with him)
- Adds note: "Store run - back in 45 min"
- When he returns, he checks back in

**Scenario 2:** Family heading home for the day
- One parent checks out the entire family
- No need to add a note (it's assumed they're done for the day)

---

### Quick Reference

| Action | When | Who to Select |
|--------|------|---------------|
| Check In | Arriving | Only people arriving NOW |
| Check Out (temporary) | Store run, emergency | Only people leaving NOW |
| Check Out (final) | Going home | Everyone who's leaving |

---

## For Leaders (Cubmaster, Assistant Cubmasters, Committee Chair)

### Creating an Event

**Before each campout:**

1. Open the app URL
2. Click "Leader Dashboard"
3. Click "+ Create New Event"
4. Fill in:
   - Event Name (e.g., "Spring 2026 Campout")
   - Event Date (e.g., February 27, 2026)
   - Location (e.g., "Camp Wilderness")
5. Click "Create Event"

The event is now available for families to check in/out.

---

### Monitoring Attendance

**During the campout:**

1. Open the app URL
2. Click "Leader Dashboard"
3. Select your event from the dropdown

**Dashboard Shows:**
- **Total on Site:** Everyone currently checked in
- **Scouts:** Number of Scouts present
- **Adults:** Number of adults present
- **Families:** Number of families with at least one person on site

**Attendance List:**
- Shows everyone currently checked in
- Lists by family name and individual name
- Shows check-in time for each person

**Auto-Refresh:**
- Dashboard refreshes every 30 seconds automatically
- Click "🔄 Refresh" for immediate update

---

### Emergency Situations

**If you need to quickly see who's on site:**

1. Go to Leader Dashboard
2. Look at the attendance list
3. All currently checked-in people are shown

**If someone is missing:**
- Check the Google Sheet "Attendance" tab
- Filter by Event ID
- Look for the last CHECK-IN without a matching CHECK-OUT
- Contact the family using the phone numbers in the "Families" tab

---

### Managing the Google Sheet

**Accessing the Sheet:**
1. Go to the Google Sheet where the app is installed
2. Click on the tabs at the bottom:
   - **Families:** All registered families and contact info
   - **FamilyMembers:** All Scouts, siblings, and adults
   - **Events:** List of all campouts
   - **Attendance:** Complete log of all check-ins and check-outs

**Common Tasks:**

**Manually Add a Family:**
1. Go to "Families" tab
2. Add a new row with:
   - Family ID (format: FAM followed by a number)
   - Last name
   - Parent contact information
3. Go to "FamilyMembers" tab
4. Add rows for each family member with the same Family ID

**View Attendance History:**
1. Go to "Attendance" tab
2. Filter by Event ID to see a specific campout
3. Sort by Timestamp to see chronological order
4. Export to CSV: File → Download → CSV

**Create Reports:**
- Use Google Sheets pivot tables
- Filter by event, family, or date range
- Share with Pack Committee as needed

---

### Troubleshooting

**Problem:** Family can't find their name when searching
- **Solution:** Check the "Families" sheet - verify they're registered
- **Quick Fix:** Manually add them to the sheet (see above)

**Problem:** Someone is showing as checked in but they're not on site
- **Solution:** Manually check them out:
  1. Go to "Attendance" sheet
  2. Add a new row:
     - Timestamp: Current date/time
     - Event ID: Current event
     - Family ID: From "Families" sheet
     - Member Name: Person's name
     - Action: CHECK-OUT
     - Currently On Site: NO
     - Notes: "Manual checkout by [your name]"

**Problem:** Dashboard not showing current numbers
- **Solution:** Click the Refresh button
- **If still wrong:** Check the "Attendance" sheet for errors

---

### Best Practices

1. **Create Events in Advance**
   - Set up the event a week before the campout
   - Test check-in with your own family

2. **Have a Backup**
   - Print a list of registered families
   - Have a tablet or phone with the dashboard open
   - Know how to access the Google Sheet directly

3. **Brief Your Team**
   - Show Assistant Cubmasters how to access the dashboard
   - Ensure at least 2 leaders can troubleshoot

4. **Post the QR Code Prominently**
   - Near the entrance/parking area
   - In a weatherproof sleeve
   - Large enough to scan from 3-4 feet away

5. **End-of-Event Checklist**
   - Review dashboard before dismissing Scouts
   - Verify everyone has checked out
   - If anyone is still showing as checked in, follow up

---

## Privacy & Security Notes

- **Who can access:** Anyone with the web app URL
- **What they can see:** Only their own family information when they search
- **Leader dashboard:** Shows first names and last names only (no phone numbers or emails)
- **Google Sheet:** Only you (the Pack leader who deployed the app) can access the full sheet
- **Data storage:** All data is stored in your Google Drive (not shared publicly)

---

## Support

**For Technical Issues:**
- Contact: [Volunteer Developer Name/Email]
- Include: Screenshot of the error and description of what you were doing

**For Pack Questions:**
- Cubmaster: [Name/Email]
- Committee Chair: [Name/Email]

---

**System ready for Spring 2026 Campout - February 27, 2026** 🏕️
