

document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".btn-group button");
    var tableBody = document.querySelector("#feelingsTable tbody");
  
    // Load stored data from local storage
    loadTableData();
  
    buttons.forEach(function(button) {
      button.addEventListener("click", function() {
        var selectedValue = this.textContent;
        console.log("Selected value:", selectedValue);
        var currentDate = new Date().toLocaleDateString();
        var row = createTableRow(currentDate, selectedValue);
  
        tableBody.appendChild(row);
  
        // Save updated data to local storage
        saveTableData();
      });
    });
  
    function createTableRow(date, value) {
      var row = document.createElement("tr");
  
      var dateCell = document.createElement("td");
      dateCell.textContent = date;
      row.appendChild(dateCell);
  
      var valueCell = document.createElement("td");
      valueCell.textContent = value;
      row.appendChild(valueCell);
  
      var actionCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        row.remove();
        saveTableData(); // Save updated data to local storage
      });
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);
  
      return row;
    }
  
    function saveTableData() {
      var tableData = [];
  
      // Extract data from table and store in an array
      var rows = tableBody.querySelectorAll("tr");
      rows.forEach(function(row) {
        var cells = row.querySelectorAll("td");
        var rowData = {
          date: cells[0].textContent,
          value: cells[1].textContent
        };
        tableData.push(rowData);
      });
  
      // Save the data to local storage
      localStorage.setItem("tableData", JSON.stringify(tableData));
    }
  
    function loadTableData() {
      var storedData = localStorage.getItem("tableData");
  
      if (storedData) {
        var tableData = JSON.parse(storedData);
  
        // Create table rows for each stored data
        tableData.forEach(function(data) {
          var row = createTableRow(data.date, data.value);
          tableBody.appendChild(row);
        });
      }
    }
  });