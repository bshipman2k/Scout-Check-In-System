# Scout Check-In/Check-Out System

A lightweight Google Apps Script application for managing family registration and real-time attendance tracking at Scout campouts.

## Features

- **Family Registration**: One-time setup for each family with parent/guardian info and children
- **QR Code Check-In**: Quick check-in via QR code scanning at campsite
- **Check-Out Tracking**: Log departures (temporary or end of event)
- **Real-Time Dashboard**: Leaders can see who's currently on-site
- **Mobile-Friendly**: Works on any smartphone or tablet

## Quick Start

1. Create a new Google Spreadsheet
2. Go to Extensions → Apps Script
3. Copy all files from this directory into the Apps Script editor
4. Deploy as a web app (follow SETUP.md)
5. Generate a QR code pointing to your web app URL
6. Print the QR code and post it at the campsite entrance

## Files Overview

- `Code.gs` - Main server-side logic (Google Apps Script)
- `Index.html` - Main web app interface
- `Registration.html` - Family registration page
- `CheckIn.html` - Check-in interface
- `CheckOut.html` - Check-out interface
- `Dashboard.html` - Leader dashboard showing current attendance
- `Stylesheet.html` - CSS styling for all pages
- `JavaScript.html` - Client-side utilities
- `SETUP.md` - Detailed setup instructions

## Technology Stack

- Google Apps Script (JavaScript)
- Google Sheets (database)
- HTML/CSS (web interface)
- Google Web Apps (hosting)

## Ready for Spring 2026 Campout (February 27)

This system is designed to meet legislative requirements for real-time roster tracking at youth organization events.

## Support

For questions or issues, contact your Pack's volunteer developer team.
