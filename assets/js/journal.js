// Modify the variable names to match your variables
var journalDisplayEl = $('#journal-display');
var journalFormEl = $('#journal-form');
var journalTitleInputEl = $('#journal-title-input');
var journalDateInputEl = $('#journal-date-input');
var journalEntryInputEl = $('#journal-entry-input');

// Reads journal entries from local storage and returns an array of entry objects
// Returns an empty array ([]) if there aren't any entries
function readEntriesFromStorage() {
  var entries = localStorage.getItem('journalEntries');
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
}

// Takes an array of journal entries and saves them in local storage
function saveEntriesToStorage(entries) {
  localStorage.setItem('journalEntries', JSON.stringify(entries));
}

// Gets journal entry data from local storage and displays it
function printEntryData() {
  // Clear current entries on the page
  journalDisplayEl.empty();

  // Get entries from local storage
  var entries = readEntriesFromStorage();

  // Loop through each entry and create a row
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];

    // Create row and columns for entry
    var rowEl = $('<tr>');
    var dateEl = $('<td>').text(entry.date);
    var titleEl = $('<td>').text(entry.title);
    var entryEl = $('<td>').text(entry.entry);
    // var deleteEl = $('<td>').html('<button class="btn btn-sm">X</button>');

        // Save the index of the project as a data-* attribute on the button. This
    // will be used when removing the project from the array.
    var deleteEl = $(
        '<td><button class="btn btn-sm btn-delete-project" data-index="' +
          i +
          '">X</button></td>'
      );

    // Append elements to the row
    rowEl.append(dateEl, titleEl, entryEl, deleteEl);
    journalDisplayEl.append(rowEl);
  }
}

// Removes an entry from local storage and prints the entry data
function handleDeleteEntry() {
  var entryIndex = parseInt($(this).attr('data-index'));
  var entries = readEntriesFromStorage();
  // Remove entry from the array
  entries.splice(entryIndex, 1);
  saveEntriesToStorage(entries);

  // Print entry data
  printEntryData();
}

// Adds an entry to local storage and prints the entry data
function handleJournalFormSubmit(event) {
  event.preventDefault();

  // Read user input from the form
  var entryTitle = journalTitleInputEl.val().trim();
  var entryDate = journalDateInputEl.val();
  var entryEntry = journalEntryInputEl.val().trim();

  var newEntry = {
    title: entryTitle,
    date: entryDate,
    entry: entryEntry
  };

  // Add entry to local storage
  var entries = readEntriesFromStorage();
  entries.push(newEntry);
  saveEntriesToStorage(entries);

  // Print entry data
  printEntryData();

  // Clear the form inputs
  journalTitleInputEl.val('');
  journalDateInputEl.val('');
  journalEntryInputEl.val('');
}

journalFormEl.on('submit', handleJournalFormSubmit);

// Use jQuery event delegation to listen for clicks on dynamically added delete buttons
journalDisplayEl.on('click', '.btn', handleDeleteEntry);

// Print initial entry data
printEntryData();
