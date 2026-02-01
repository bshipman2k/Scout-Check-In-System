# Deployment Checklist - Scout Check-In System

Use this checklist to ensure a smooth deployment before your Spring 2026 Campout on February 27.

## Phase 1: Setup (Complete by February 1)

### 1. Create Google Spreadsheet
- [ ] Create new Google Sheet named "Scout Attendance System"
- [ ] Create sheets: Families, FamilyMembers, Events, Attendance
- [ ] Share sheet with backup administrator (optional)

### 2. Deploy Apps Script
- [ ] Open Extensions → Apps Script
- [ ] Create and copy all 8 files:
  - [ ] Code.gs
  - [ ] Index.html
  - [ ] Registration.html
  - [ ] CheckIn.html
  - [ ] CheckOut.html
  - [ ] Dashboard.html
  - [ ] Stylesheet.html
- [ ] Save all files
- [ ] Click Deploy → New deployment
- [ ] Configure:
  - [ ] Type: Web app
  - [ ] Execute as: Me
  - [ ] Who has access: Anyone
- [ ] Click Deploy
- [ ] Authorize permissions
- [ ] Copy Web App URL
- [ ] Test URL in browser

### 3. Initialize Database
- [ ] Visit Web App URL
- [ ] Go to Dashboard
- [ ] Verify all sheets were created automatically
- [ ] Check that headers are formatted correctly

### 4. Create First Event
- [ ] Go to Leader Dashboard
- [ ] Click "Create New Event"
- [ ] Enter:
  - Event Name: "Spring 2026 Campout"
  - Event Date: February 27, 2026
  - Location: [Your campsite]
- [ ] Verify event appears in dropdown

---

## Phase 2: Testing (Complete by February 10)

### 5. Test Family Registration
- [ ] Register a test family (use your own info)
- [ ] Verify family appears in "Families" sheet
- [ ] Verify members appear in "FamilyMembers" sheet
- [ ] Try searching for the test family by last name

### 6. Test Check-In Flow
- [ ] Go to Check In page
- [ ] Select Spring 2026 Campout
- [ ] Search for test family
- [ ] Check in test family members
- [ ] Verify data appears in "Attendance" sheet
- [ ] Check dashboard shows correct counts

### 7. Test Check-Out Flow
- [ ] Go to Check Out page
- [ ] Search for test family
- [ ] Verify only checked-in members appear
- [ ] Check out test members
- [ ] Verify dashboard updates correctly
- [ ] Check "Attendance" sheet for CHECK-OUT records

### 8. Test Dashboard
- [ ] View current attendance
- [ ] Verify statistics are accurate
- [ ] Test manual refresh button
- [ ] Verify auto-refresh works (wait 30 seconds)
- [ ] Test on mobile device

---

## Phase 3: Family Onboarding (Complete by February 20)

### 9. Create QR Code
- [ ] Go to QR code generator (qr-code-generator.com)
- [ ] Paste Web App URL
- [ ] Generate QR code
- [ ] Download high-resolution image
- [ ] Test QR code with phone camera
- [ ] Print QR code (8.5" x 11" recommended)
- [ ] Laminate or put in weatherproof sleeve

### 10. Communicate with Families
- [ ] Send email to all families with:
  - [ ] Web App URL
  - [ ] Registration instructions
  - [ ] Deadline to register (February 25)
  - [ ] Link to USER_GUIDE.md
- [ ] Post announcement on Pack website/Facebook
- [ ] Mention at Pack meeting
- [ ] Send reminder email February 15

### 11. Family Registration Period
- [ ] Monitor "Families" sheet for new registrations
- [ ] Follow up with families who haven't registered
- [ ] Answer questions and troubleshoot
- [ ] Manually add families if needed

---

## Phase 4: Leader Preparation (Complete by February 25)

### 12. Train Leadership Team
- [ ] Brief Cubmaster on system
- [ ] Show Assistant Cubmasters how to access dashboard
- [ ] Explain to Committee Chair
- [ ] Share backup access credentials
- [ ] Review USER_GUIDE.md with team
- [ ] Practice emergency scenarios

### 13. Prepare Backup Materials
- [ ] Print list of all registered families
- [ ] Print contact information (from "Families" sheet)
- [ ] Save Web App URL to multiple devices
- [ ] Bookmark dashboard on leadership phones/tablets
- [ ] Create paper sign-in sheet as backup
- [ ] Print troubleshooting guide

### 14. Test Final Setup
- [ ] Verify all families are registered
- [ ] Check Spring 2026 Campout event is active
- [ ] Test check-in flow one more time
- [ ] Verify dashboard loads quickly
- [ ] Test on mobile data (not just WiFi)
- [ ] Confirm QR code works

---

## Phase 5: Campout Day (February 27)

### 15. Pre-Event Setup
- [ ] Arrive early to set up
- [ ] Post QR code at entrance/parking area
- [ ] Ensure QR code is visible and scannable
- [ ] Have backup device with dashboard open
- [ ] Have printed family list as backup
- [ ] Test cell service at campsite

### 16. During Event Monitoring
- [ ] Check dashboard every 30 minutes
- [ ] Monitor for families having trouble checking in
- [ ] Assist families with first-time use
- [ ] Manually check in anyone who can't use the app
- [ ] Track any technical issues

### 17. End of Event
- [ ] Review dashboard before dismissing
- [ ] Verify all families have checked out
- [ ] Follow up with any still showing as checked in
- [ ] Manually check out anyone who forgot
- [ ] Export attendance data

---

## Phase 6: Post-Event Review (Within 1 Week)

### 18. Data Management
- [ ] Export "Attendance" sheet to CSV
- [ ] Archive data for Pack records
- [ ] Share attendance report with Committee
- [ ] Note any families who didn't check in/out properly

### 19. Gather Feedback
- [ ] Survey families on ease of use
- [ ] Ask leaders for feedback
- [ ] Note any technical issues encountered
- [ ] Document suggestions for improvement

### 20. Plan for Next Event
- [ ] Create event for next campout
- [ ] Apply lessons learned
- [ ] Update USER_GUIDE.md if needed
- [ ] Share success with Pack leadership

---

## Emergency Contacts

**Developer Support:**
- Name: ____________________
- Email: ____________________
- Phone: ____________________

**Google Account Owner:**
- Name: ____________________
- Email: ____________________
- Password Location: ____________________

**Backup Admin:**
- Name: ____________________
- Email: ____________________
- Phone: ____________________

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| QR code not working | Share URL via text/email |
| Dashboard not loading | Use direct spreadsheet access |
| Family can't find their name | Manually add to sheet |
| Check-in not recording | Add directly to "Attendance" sheet |
| App is slow | Use paper backup, update sheet later |

---

## Success Criteria

- [ ] 90%+ families registered before campout
- [ ] All families able to check in successfully
- [ ] Leaders can view real-time attendance
- [ ] Zero lost Scouts or confusion during emergency drill
- [ ] All families checked out by end of event
- [ ] Positive feedback from families and leaders

---

**Ready for Spring 2026 Campout - February 27, 2026** 🎉

Good luck, and thank you for keeping our Scouts safe!
