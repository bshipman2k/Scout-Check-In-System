# QR Code Instructions

## How to Create Your QR Code

After deploying your Google Apps Script web app, you'll need to create a QR code for easy access at the campsite.

### Step 1: Get Your Web App URL

1. In Google Apps Script, after deploying, you'll receive a URL like:
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
   ```

2. **Copy this entire URL** - you'll need it for the QR code generator.

### Step 2: Generate QR Code

#### Option A: Free Online Generators (Recommended)

Visit any of these free QR code generators:

1. **QR Code Generator** (https://www.qr-code-generator.com/)
   - Paste your URL
   - Select "URL" type
   - Customize color if desired (recommend keeping it black/white for best scanning)
   - Download in PNG or SVG format

2. **QR Code Monkey** (https://www.qrcode-monkey.com/)
   - Paste URL in "Your URL" field
   - Can add logo (like Pack emblem) in center
   - Download in high resolution

3. **Flowcode** (https://www.flowcode.com/)
   - Create free account
   - Generate QR code from URL
   - Track scans (optional feature)

#### Option B: Google Chrome Extension

1. Install "QR Code Generator" extension
2. Visit your Web App URL
3. Click extension icon
4. Download QR code image

### Step 3: Prepare for Printing

**Recommended Print Size:** 8.5" x 11" (full page)

**File Format:**
- Use PNG or PDF for best quality
- Minimum 300 DPI resolution

**Design Tips:**
- Add text above QR code: "**Scout Check-In System**"
- Add text below: "Scan to check in or check out"
- Include URL as text (in case QR code doesn't scan)
- Use high contrast (black on white background)

### Sample Sign Template

```
┌─────────────────────────────────────────┐
│                                         │
│     SCOUT CHECK-IN/CHECK-OUT SYSTEM    │
│                                         │
│         [QR CODE GOES HERE]            │
│              █████████                  │
│              ██ ▄▄▄ ██                  │
│              ██ ███ ██                  │
│              ██▄▄▄▄▄██                  │
│              ▄▄▄▄▄ ▄▄                   │
│                                         │
│    📱 Scan with your phone camera      │
│                                         │
│    ✅ Arriving? Check In               │
│    👋 Leaving? Check Out               │
│                                         │
│  Or visit: [your-short-url]           │
│                                         │
│     Spring 2026 Campout                │
│        February 27, 2026               │
│                                         │
└─────────────────────────────────────────┘
```

### Step 4: Print and Protect

1. **Print:**
   - Use color or black & white printer
   - Print on cardstock (heavier paper) if possible
   - Print 2-3 copies (have backups!)

2. **Protect:**
   - Laminate the page (recommended)
   - Or use a clear sheet protector
   - Or place in a weatherproof document sleeve
   - Tape to rigid backing (cardboard, foam board)

3. **Post at Campsite:**
   - Near entrance/parking area
   - At eye level
   - Well-lit area
   - Protected from rain/wind
   - Use easel stand, tape to wall, or attach to signpost

### Step 5: Test Your QR Code

**Before the campout:**

1. **Test with multiple phones:**
   - iPhone camera
   - Android camera
   - Different browsers

2. **Test from different distances:**
   - Should scan from 2-4 feet away
   - If not, increase QR code size

3. **Test in different lighting:**
   - Bright sunlight
   - Shade
   - Indoor lighting

### Alternative Access Methods

If families have trouble scanning:

1. **Short URL:** Create a bit.ly or TinyURL link
   - Example: bit.ly/scoutcheckin2026
   - Easier to type manually

2. **Bookmark:** Email link to all families
   - They can bookmark on their phones
   - No scanning needed

3. **Text Message:** Set up a group text
   - Send link to all families
   - They can tap to open

### Troubleshooting QR Codes

| Problem | Solution |
|---------|----------|
| Won't scan | Increase size, check contrast, ensure good lighting |
| Takes too long | Use high-resolution image, print larger |
| Wrong link | Regenerate QR code with correct URL |
| Faded | Reprint with better ink/toner |
| Damaged | Post backup copy, have digital backup on tablet |

---

## Quick Setup for Pack Leaders

**Don't want to deal with QR codes?** Here are simpler alternatives:

### Option 1: Bookmark Distribution
- Email web app URL to all families
- Ask them to bookmark it
- No printing needed!

### Option 2: Group Text
- Create a group text with all families
- Send the link
- Families click to access
- Re-send for each campout

### Option 3: Pack Website
- Add link to your Pack's website
- Families access from there
- Update once, works forever

---

## Sample Email to Families

```
Subject: New Check-In System for Spring Campout

Hi Scout Families!

We're excited to introduce our new digital check-in system for the Spring 2026 Campout on February 27.

🔗 Access the system here: [Your Web App URL]

📱 Save this link or scan the QR code at camp

What to do:
1. Register your family (one-time setup): [Link]
2. At camp, check in when you arrive
3. Check out when you leave

Questions? Reply to this email or contact [Cubmaster Name].

See you at camp!
[Your Name]
```

---

**Need Help?** Contact your volunteer developer or Pack leadership.
