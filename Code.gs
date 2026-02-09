// Scout Check-In/Check-Out System
// Google Apps Script Backend
// Created for Spring 2026 Campout

// Configuration
var SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
var FAMILIES_SHEET = 'Families';
var EVENTS_SHEET = 'Events';
var ATTENDANCE_SHEET = 'Attendance';

/**
 * Test function to verify getCurrentAttendance works
 */
function testGetCurrentAttendance() {
  var eventId = 'EVT1769902239495'; // Your actual event ID
  var result = getCurrentAttendance(eventId);
  Logger.log('Test result: ' + JSON.stringify(result));
  Logger.log('Result type: ' + typeof result);
  Logger.log('Is array: ' + Array.isArray(result));
  return result;
}


/**
 * Serves the main web app interface
 */
function doGet(e) {
  var page = e.parameter.page || 'index';
  var eventId = e.parameter.event || '';
  
  switch(page) {
    case 'register':
      var template = HtmlService.createTemplateFromFile('Registration');
      template.eventId = eventId;
      return template.evaluate().setTitle('Family Registration');
    case 'updateregistration':
      var template = HtmlService.createTemplateFromFile('UpdateRegistration');
      template.eventId = eventId;
      return template.evaluate().setTitle('Update Registration');
    case 'checkin':
      var template = HtmlService.createTemplateFromFile('CheckIn');
      template.eventId = eventId;
      return template.evaluate().setTitle('Check In');
    case 'checkout':
      var template = HtmlService.createTemplateFromFile('CheckOut');
      template.eventId = eventId;
      return template.evaluate().setTitle('Check Out');
    case 'dashboard':
      var template = HtmlService.createTemplateFromFile('Dashboard');
      template.eventId = eventId;
      return template.evaluate().setTitle('Leader Dashboard');
    case 'leadership':
      var template = HtmlService.createTemplateFromFile('Leadership');
      template.eventId = eventId;
      return template.evaluate().setTitle('Pack Leadership');
    default:
      var template = HtmlService.createTemplateFromFile('Index');
      template.eventId = eventId;
      return template.evaluate().setTitle('Scout Check-In System');
  }
}

/**
 * Include external HTML files (for modular design)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Initialize spreadsheet with proper structure
 */
function initializeSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create Families sheet
  var familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
  if (!familiesSheet) {
    familiesSheet = ss.insertSheet(FAMILIES_SHEET);
    familiesSheet.getRange('A1:H1').setValues([[
      'Family ID', 'Last Name', 'Parent 1 Name', 'Parent 1 Phone', 'Parent 1 Email',
      'Parent 2 Name', 'Parent 2 Phone', 'Parent 2 Email'
    ]]);
    familiesSheet.getRange('A1:H1').setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // Create Family Members sheet
  var membersSheet = ss.getSheetByName('FamilyMembers');
  if (!membersSheet) {
    membersSheet = ss.insertSheet('FamilyMembers');
    membersSheet.getRange('A1:H1').setValues([[
      'Family ID', 'Member Name', 'Member Type', 'Age', 'Rank', 'Den', 'Registered', 'YPT'
    ]]);
    membersSheet.getRange('A1:H1').setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // Create Events sheet
  var eventsSheet = ss.getSheetByName(EVENTS_SHEET);
  if (!eventsSheet) {
    eventsSheet = ss.insertSheet(EVENTS_SHEET);
    eventsSheet.getRange('A1:E1').setValues([[
      'Event ID', 'Event Name', 'Event Date', 'Location', 'Status'
    ]]);
    eventsSheet.getRange('A1:E1').setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  // Create Attendance sheet
  var attendanceSheet = ss.getSheetByName(ATTENDANCE_SHEET);
  if (!attendanceSheet) {
    attendanceSheet = ss.insertSheet(ATTENDANCE_SHEET);
    attendanceSheet.getRange('A1:G1').setValues([[
      'Timestamp', 'Event ID', 'Family ID', 'Member Name', 'Action', 'Currently On Site', 'Notes'
    ]]);
    attendanceSheet.getRange('A1:G1').setFontWeight('bold').setBackground('#4285f4').setFontColor('white');
  }
  
  return 'Spreadsheet initialized successfully';
}

/**
 * Register a new family
 */
function registerFamily(familyData) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    // Create sheets if they don't exist
    if (!familiesSheet || !membersSheet) {
      initializeSpreadsheet();
      familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
      membersSheet = ss.getSheetByName('FamilyMembers');
    }
    
    // Generate unique family ID
    var familyId = 'FAM' + new Date().getTime();
    
    // Add family record
    familiesSheet.appendRow([
      familyId,
      familyData.lastName,
      familyData.parent1Name,
      familyData.parent1Phone,
      familyData.parent1Email,
      familyData.parent2Name || '',
      familyData.parent2Phone || '',
      familyData.parent2Email || ''
    ]);
    
    // Add Parent 1 as a family member
    if (familyData.parent1Name) {
      membersSheet.appendRow([
        familyId,
        familyData.parent1Name,
        'Parent',
        '', // Age not collected for parents
        '', // Rank not applicable for parents
        '', // Den not applicable for parents
        '', // Registered not applicable
        ''  // YPT not applicable
      ]);
    }
    
    // Add Parent 2 as a family member if provided
    if (familyData.parent2Name) {
      membersSheet.appendRow([
        familyId,
        familyData.parent2Name,
        'Parent',
        '', // Age not collected for parents
        '', // Rank not applicable for parents
        '', // Den not applicable for parents
        '', // Registered not applicable
        ''  // YPT not applicable
      ]);
    }
    
    // Add family members (scouts, siblings, etc.)
    familyData.members.forEach(function(member) {
      var memberFullName = member.name;
      
      // Use member's individual sharedLastName preference
      if (member.sharedLastName) {
        // Use family last name
        if (!memberFullName.toLowerCase().includes(familyData.lastName.toLowerCase())) {
          memberFullName = memberFullName + ' ' + familyData.lastName;
        }
      } else {
        // Use individual last name if provided
        if (member.lastName && member.lastName.trim()) {
          if (!memberFullName.toLowerCase().includes(member.lastName.toLowerCase())) {
            memberFullName = memberFullName + ' ' + member.lastName;
          }
        }
      }
      
      membersSheet.appendRow([
        familyId,
        memberFullName,
        member.type,
        member.age || '',
        member.rank || '',
        member.den || '',
        member.registered || '',
        member.ypt || ''
      ]);
    });
    
    return {
      success: true,
      familyId: familyId,
      message: 'Family registered successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

/**
 * Search for families by last name
 */
function searchFamilies(searchTerm) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    if (!familiesSheet || !membersSheet) {
      return [];
    }
    
    var familiesData = familiesSheet.getDataRange().getValues();
    var membersData = membersSheet.getDataRange().getValues();
    
    var results = [];
    var searchLower = searchTerm.toLowerCase();
    
    // Search families (skip header row)
    for (var i = 1; i < familiesData.length; i++) {
      var row = familiesData[i];
      var lastName = row[1].toString().toLowerCase();
      
      if (lastName.includes(searchLower)) {
        var familyId = row[0];
        
        // Get all members for this family
        var members = [];
        for (var j = 1; j < membersData.length; j++) {
          if (membersData[j][0] === familyId) {
            members.push({
              name: membersData[j][1],
              type: membersData[j][2],
              age: membersData[j][3],
              rank: membersData[j][4] || '',
              den: membersData[j][5] || ''
            });
          }
        }
        
        results.push({
          familyId: familyId,
          lastName: row[1],
          parent1Name: row[2],
          parent1Phone: row[3],
          members: members
        });
      }
    }
    
    return results;
  } catch (error) {
    Logger.log('Search error: ' + error);
    return [];
  }
}

/**
 * Check in family members
 */
function checkInMembers(eventId, familyId, memberNames) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var attendanceSheet = ss.getSheetByName(ATTENDANCE_SHEET);
    
    if (!attendanceSheet) {
      initializeSpreadsheet();
      attendanceSheet = ss.getSheetByName(ATTENDANCE_SHEET);
    }
    
    var timestamp = new Date();
    
    memberNames.forEach(function(memberName) {
      attendanceSheet.appendRow([
        timestamp,
        eventId,
        familyId,
        memberName,
        'CHECK-IN',
        'YES',
        ''
      ]);
    });
    
    return {
      success: true,
      message: memberNames.length + ' member(s) checked in successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

/**
 * Check out family members
 */
function checkOutMembers(eventId, familyId, memberNames, notes) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var attendanceSheet = ss.getSheetByName(ATTENDANCE_SHEET);
    
    if (!attendanceSheet) {
      return {
        success: false,
        message: 'Attendance sheet not found'
      };
    }
    
    var timestamp = new Date();
    
    memberNames.forEach(function(memberName) {
      attendanceSheet.appendRow([
        timestamp,
        eventId,
        familyId,
        memberName,
        'CHECK-OUT',
        'NO',
        notes || ''
      ]);
    });
    
    return {
      success: true,
      message: memberNames.length + ' member(s) checked out successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

/**
 * Get current attendance (who's on site right now)
 */
function getCurrentAttendance(eventId) {
  Logger.log('=== getCurrentAttendance called with eventId: ' + eventId + ' ===');
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Got spreadsheet: ' + ss.getName());
    
    var attendanceSheet = ss.getSheetByName(ATTENDANCE_SHEET);
    var familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    Logger.log('Attendance sheet exists: ' + !!attendanceSheet);
    Logger.log('Families sheet exists: ' + !!familiesSheet);
    Logger.log('Members sheet exists: ' + !!membersSheet);
    
    if (!attendanceSheet || !familiesSheet || !membersSheet) {
      Logger.log('ERROR: Sheets not found');
      return [];
    }
    
    var attendanceData = attendanceSheet.getDataRange().getValues();
    var familiesData = familiesSheet.getDataRange().getValues();
    var membersData = membersSheet.getDataRange().getValues();
    
    Logger.log('EventId received: ' + eventId);
    Logger.log('Attendance rows: ' + attendanceData.length);
    Logger.log('Families rows: ' + familiesData.length);
    Logger.log('Members rows: ' + membersData.length);
    
    // Build a map of family IDs to last names
    var familyMap = {};
    for (var i = 1; i < familiesData.length; i++) {
      if (familiesData[i][0]) {
        var famId = String(familiesData[i][0]).trim();
        familyMap[famId] = familiesData[i][1];
        Logger.log('Mapped family: ' + famId + ' -> ' + familiesData[i][1]);
      }
    }
    
    // Build a map of member details
    var memberDetailsMap = {};
    for (var i = 1; i < membersData.length; i++) {
      if (membersData[i][0] && membersData[i][1]) {
        var famId = String(membersData[i][0]).trim();
        var memberName = String(membersData[i][1]).trim();
        var key = famId + '|' + memberName;
        memberDetailsMap[key] = {
          type: membersData[i][2] || '',
          rank: membersData[i][4] || '',
          den: membersData[i][5] || ''
        };
      }
    }
    
    // Track who's currently checked in
    var currentlyOnSite = {};
    
    // Process attendance records (skip header)
    for (var i = 1; i < attendanceData.length; i++) {
      var row = attendanceData[i];
      
      // Skip empty rows
      if (!row[1] || !row[2] || !row[3]) continue;
      
      var recordEventId = String(row[1]).trim();
      var familyId = String(row[2]).trim();
      var memberName = String(row[3]).trim();
      var action = String(row[4]).trim();
      
      Logger.log('Processing row ' + i + ': EventId=' + recordEventId + ', FamilyId=' + familyId + ', Member=' + memberName + ', Action=' + action);
      
      // Only process records for this event (compare as strings)
      if (recordEventId === String(eventId).trim()) {
        Logger.log('Match found for event ' + eventId);
        var key = familyId + '|' + memberName;
        
        if (action === 'CHECK-IN') {
          // Convert Date to ISO string for proper serialization
          var checkInTime = row[0];
          if (checkInTime instanceof Date) {
            checkInTime = checkInTime.toISOString();
          }
          
          var memberDetails = memberDetailsMap[key] || {};
          
          currentlyOnSite[key] = {
            familyId: familyId,
            lastName: familyMap[familyId] || 'Unknown',
            memberName: memberName,
            checkInTime: checkInTime,
            type: memberDetails.type || '',
            rank: memberDetails.rank || '',
            den: memberDetails.den || ''
          };
          Logger.log('Added to currentlyOnSite: ' + key);
        } else if (action === 'CHECK-OUT') {
          delete currentlyOnSite[key];
          Logger.log('Removed from currentlyOnSite: ' + key);
        }
      }
    }
    
    // Convert to array
    var result = [];
    for (var key in currentlyOnSite) {
      result.push(currentlyOnSite[key]);
    }
    
    Logger.log('Total currently on site: ' + result.length);
    
    // Sort by last name, then member name
    result.sort(function(a, b) {
      if (a.lastName !== b.lastName) {
        return a.lastName.localeCompare(b.lastName);
      }
      return a.memberName.localeCompare(b.memberName);
    });
    
    return result;
  } catch (error) {
    Logger.log('Get attendance error: ' + error);
    Logger.log('Error stack: ' + error.stack);
    return [];
  }
}

/**
 * Get list of events
 */
function getEvents() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var eventsSheet = ss.getSheetByName(EVENTS_SHEET);
    
    if (!eventsSheet) {
      initializeSpreadsheet();
      eventsSheet = ss.getSheetByName(EVENTS_SHEET);
      return [];
    }
    
    var data = eventsSheet.getDataRange().getValues();
    var events = [];
    
    // Skip header row
    for (var i = 1; i < data.length; i++) {
      // Skip empty rows
      if (!data[i][0]) continue;
      
      var eventDate = data[i][2];
      // Format date if it's a Date object
      if (eventDate instanceof Date) {
        eventDate = Utilities.formatDate(eventDate, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      }
      
      events.push({
        eventId: String(data[i][0]).trim(),
        eventName: String(data[i][1]).trim(),
        eventDate: eventDate,
        location: String(data[i][3]).trim(),
        status: String(data[i][4]).trim()
      });
    }
    
    return events;
  } catch (error) {
    Logger.log('Get events error: ' + error);
    return [];
  }
}

/**
 * Create a new event
 */
function createEvent(eventName, eventDate, location) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var eventsSheet = ss.getSheetByName(EVENTS_SHEET);
    
    if (!eventsSheet) {
      initializeSpreadsheet();
      eventsSheet = ss.getSheetByName(EVENTS_SHEET);
    }
    
    var eventId = 'EVT' + new Date().getTime();
    
    eventsSheet.appendRow([
      eventId,
      eventName,
      eventDate,
      location,
      'Active'
    ]);
    
    return {
      success: true,
      eventId: eventId,
      message: 'Event created successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

/**
 * Get members currently checked in for a family
 */
function getCheckedInMembers(eventId, familyId) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var attendanceSheet = ss.getSheetByName(ATTENDANCE_SHEET);
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    if (!attendanceSheet || !membersSheet) {
      return [];
    }
    
    var attendanceData = attendanceSheet.getDataRange().getValues();
    var membersData = membersSheet.getDataRange().getValues();
    
    // Get all family members
    var allMembers = [];
    for (var i = 1; i < membersData.length; i++) {
      if (String(membersData[i][0]).trim() === String(familyId).trim()) {
        allMembers.push({
          name: membersData[i][1],
          type: membersData[i][2],
          rank: membersData[i][4] || '',
          den: membersData[i][5] || '',
          checkedIn: false
        });
      }
    }
    
    // Determine who's currently checked in
    var checkedInStatus = {};
    for (var i = 1; i < attendanceData.length; i++) {
      var row = attendanceData[i];
      if (String(row[1]).trim() === String(eventId).trim() && String(row[2]).trim() === String(familyId).trim()) {
        var memberName = row[3];
        var action = row[4];
        
        if (action === 'CHECK-IN') {
          checkedInStatus[memberName] = true;
        } else if (action === 'CHECK-OUT') {
          checkedInStatus[memberName] = false;
        }
      }
    }
    
    // Update checked in status
    allMembers.forEach(function(member) {
      member.checkedIn = checkedInStatus[member.name] || false;
    });
    
    return allMembers;
  } catch (error) {
    Logger.log('Get checked in members error: ' + error);
    return [];
  }
}

/**
 * Get attendance statistics for dashboard
 */
function getAttendanceStats(eventId) {
  try {
    var attendance = getCurrentAttendance(eventId);
    var stats = {
      totalOnSite: attendance.length,
      scouts: 0,
      siblings: 0,
      adults: 0,
      familiesCount: 0
    };
    
    var familiesSet = {};
    
    // Get member types to count properly
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var membersSheet = ss.getSheetByName('FamilyMembers');
    if (!membersSheet) return stats;
    
    var membersData = membersSheet.getDataRange().getValues();
    var memberTypeMap = {};
    
    for (var i = 1; i < membersData.length; i++) {
      memberTypeMap[membersData[i][1]] = membersData[i][2]; // name -> type
    }
    
    attendance.forEach(function(person) {
      familiesSet[person.familyId] = true;
      
      var type = memberTypeMap[person.memberName];
      if (type === 'Scout') {
        stats.scouts++;
      } else if (type === 'Sibling') {
        stats.siblings++;
      } else if (type === 'Parent' || type === 'Guardian' || type === 'Adult - Non-Guardian') {
        stats.adults++;
      }
    });
    
    stats.familiesCount = Object.keys(familiesSet).length;
    
    return stats;
  } catch (error) {
    Logger.log('Get stats error: ' + error);
    return {
      totalOnSite: 0,
      scouts: 0,
      siblings: 0,
      adults: 0,
      familiesCount: 0
    };
  }
}

/**
 * Get a single family by ID
 */
function getFamilyById(familyId) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    if (!familiesSheet || !membersSheet) {
      return null;
    }
    
    var familiesData = familiesSheet.getDataRange().getValues();
    var membersData = membersSheet.getDataRange().getValues();
    
    // Find family
    var familyRow = null;
    for (var i = 1; i < familiesData.length; i++) {
      if (String(familiesData[i][0]).trim() === String(familyId).trim()) {
        familyRow = familiesData[i];
        break;
      }
    }
    
    if (!familyRow) return null;
    
    // Get all members for this family
    var members = [];
    for (var j = 1; j < membersData.length; j++) {
      if (String(membersData[j][0]).trim() === String(familyId).trim()) {
        var fullName = membersData[j][1];
        var nameParts = fullName.split(' ');
        var firstName = nameParts.slice(0, -1).join(' ') || fullName;
        var lastName = nameParts[nameParts.length - 1];
        
        // Check if last name matches family last name
        var individualLastName = '';
        if (lastName && lastName.toLowerCase() !== familyRow[1].toLowerCase()) {
          individualLastName = lastName;
        }
        
        members.push({
          name: fullName,
          firstName: firstName,
          individualLastName: individualLastName,
          type: membersData[j][2],
          age: membersData[j][3],
          rank: membersData[j][4] || '',
          den: membersData[j][5] || '',
          registered: membersData[j][6] || '',
          ypt: membersData[j][7] || ''
        });
      }
    }
    
    return {
      familyId: familyId,
      lastName: familyRow[1],
      parent1Name: familyRow[2],
      parent1Phone: familyRow[3],
      parent1Email: familyRow[4],
      parent2Name: familyRow[5],
      parent2Phone: familyRow[6],
      parent2Email: familyRow[7],
      members: members
    };
  } catch (error) {
    Logger.log('Get family by ID error: ' + error);
    return null;
  }
}

/**
 * Update family registration
 */
function updateFamily(familyData) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var familiesSheet = ss.getSheetByName(FAMILIES_SHEET);
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    if (!familiesSheet || !membersSheet) {
      return {
        success: false,
        message: 'Required sheets not found. Please run initializeSpreadsheet()'
      };
    }
    
    var familyId = familyData.familyId;
    
    // Update family info in Families sheet
    var familiesData = familiesSheet.getDataRange().getValues();
    for (var i = 1; i < familiesData.length; i++) {
      if (String(familiesData[i][0]).trim() === String(familyId).trim()) {
        familiesSheet.getRange(i + 1, 2, 1, 7).setValues([[
          familyData.lastName,
          familyData.parent1Name,
          familyData.parent1Phone,
          familyData.parent1Email,
          familyData.parent2Name || '',
          familyData.parent2Phone || '',
          familyData.parent2Email || ''
        ]]);
        break;
      }
    }
    
    // Delete old members (except parents)
    var membersData = membersSheet.getDataRange().getValues();
    var rowsToDelete = [];
    
    for (var i = membersData.length - 1; i >= 1; i--) {
      if (String(membersData[i][0]).trim() === String(familyId).trim()) {
        var memberType = membersData[i][2];
        // Keep Parent entries, remove others
        if (memberType !== 'Parent') {
          rowsToDelete.push(i + 1);
        }
      }
    }
    
    // Delete rows in reverse order
    rowsToDelete.forEach(function(rowNum) {
      membersSheet.deleteRow(rowNum);
    });
    
    // Update parent entries
    membersData = membersSheet.getDataRange().getValues();
    var parentCount = 0;
    for (var i = 1; i < membersData.length; i++) {
      if (String(membersData[i][0]).trim() === String(familyId).trim() && membersData[i][2] === 'Parent') {
        parentCount++;
        if (parentCount === 1 && familyData.parent1Name) {
          membersSheet.getRange(i + 1, 2).setValue(familyData.parent1Name);
        } else if (parentCount === 2 && familyData.parent2Name) {
          membersSheet.getRange(i + 1, 2).setValue(familyData.parent2Name);
        } else if (parentCount === 2 && !familyData.parent2Name) {
          // Remove second parent if it was cleared
          membersSheet.deleteRow(i + 1);
        }
      }
    }
    
    // Add Parent 2 if it doesn't exist but is now provided
    if (familyData.parent2Name && parentCount < 2) {
      membersSheet.appendRow([
        familyId,
        familyData.parent2Name,
        'Parent',
        '',
        '',
        '',
        '',
        ''
      ]);
    }
    
    // Add new/updated family members
    familyData.members.forEach(function(member) {
      var memberFullName = member.name;
      
      if (member.sharedLastName) {
        // Use family last name
        if (!memberFullName.toLowerCase().includes(familyData.lastName.toLowerCase())) {
          memberFullName = memberFullName + ' ' + familyData.lastName;
        }
      } else {
        // Use individual last name if provided
        if (member.lastName && member.lastName.trim()) {
          if (!memberFullName.toLowerCase().includes(member.lastName.toLowerCase())) {
            memberFullName = memberFullName + ' ' + member.lastName;
          }
        }
      }
      
      membersSheet.appendRow([
        familyId,
        memberFullName,
        member.type,
        member.age || '',
        member.rank || '',
        member.den || '',
        member.registered || '',
        member.ypt || ''
      ]);
    });
    
    return {
      success: true,
      message: 'Family registration updated successfully!'
    };
  } catch (error) {
    Logger.log('Update family error: ' + error);
    return {
      success: false,
      message: 'Error: ' + error.toString()
    };
  }
}

/**
 * Get attendance statistics for dashboard (old position)
 */
function getAttendanceStats(eventId) {
  try {
    var currentAttendance = getCurrentAttendance(eventId);
    
    var stats = {
      totalOnSite: currentAttendance.length,
      scouts: 0,
      siblings: 0,
      adults: 0,
      families: {}
    };
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var membersSheet = ss.getSheetByName('FamilyMembers');
    
    if (!membersSheet) {
      return stats;
    }
    
    var membersData = membersSheet.getDataRange().getValues();
    var memberTypeMap = {};
    
    // Build member type map
    for (var i = 1; i < membersData.length; i++) {
      var key = membersData[i][0] + '|' + membersData[i][1]; // familyId|memberName
      memberTypeMap[key] = membersData[i][2]; // type
    }
    
    // Count by type
    currentAttendance.forEach(function(person) {
      var key = person.familyId + '|' + person.memberName;
      var type = memberTypeMap[key] || 'Unknown';
      
      if (type === 'Scout') {
        stats.scouts++;
      } else if (type === 'Sibling') {
        stats.siblings++;
      } else if (type === 'Parent' || type === 'Guardian') {
        stats.adults++;
      }
      
      stats.families[person.familyId] = true;
    });
    
    stats.familiesCount = Object.keys(stats.families).length;
    
    return stats;
  } catch (error) {
    Logger.log('Get stats error: ' + error);
    return {
      totalOnSite: 0,
      scouts: 0,
      siblings: 0,
      adults: 0,
      familiesCount: 0
    };
  }
}
