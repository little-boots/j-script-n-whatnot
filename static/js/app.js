// from data.js
var tableData = data;

// from index.html
var tbody = d3.select("tbody");

// Refresh filter
var filter = d3.select("button#filter-btn");

function displayData(data) {
   tbody.selectAll("tr").remove()

   data.forEach((alienReport) => {
      var row = tbody.append("tr");
      Object.entries(alienReport).forEach(function([key, value]) {
         var cell = row.append("td");
         cell.text(value);
      });
   });
}

displayData(tableData);

// Refresh table when button is clicked
// Moved to seperate function so that multiple events may trigger same response
filter.on("click", updateTable);

function updateTable() {
   // apply any and all relevant filters

   // Main date field (Date less than or equal to)
   var filter1 = updateEnterDate(data)

   // Secondary date field (Date exactly equal; overrides main date field, if applicable)
   var filter2 = updateDate(filter1)

   // Character filters are case-insensitive
   // City field
   var filter3 = updateCity(filter2)

   // State field
   var filter4 = updateState(filter3)

   // Country field
   var filter5 = updateCountry(filter4)

   // Shape field
   var finalfiltered = updateShape(filter5)

   displayData(finalfiltered);
};

// Modularized filters for easier troubleshooting
function updateEnterDate(data_) {
   inputElement = d3.select("input#datetime")

   var date = inputElement.property("value");

   if ( date != '' ) {
      var filteredData = data_.filter(function (row) {
         return Date.parse(row.datetime) <= Date.parse(date)
      });
   }
   else {
      var filteredData = data_
   }
   return filteredData
} 

function updateDate(data_) {
   
   inputElement = d3.select("input.date-input");

   var text = inputElement.property("value");

   if ( text != '' ) {
      // Deliberately using the main data source.  Override "Enter a Date" field.
      var filteredData = data.filter(function (row) {
         return Date.parse(row.datetime) === Date.parse(date)
      });
   }
   else {
      var filteredData = data_
   }
   return filteredData
};

// Probably easy to consolodate these functions later
function updateCity(data_) {
   
   inputElement = d3.select("input.city-input");

   var text = inputElement.property("value");

   if ( text != '' ) {
      var filteredData = data_.filter(function (row) {
         //console.log(row.city)
         //console.log(text)
         //console.log(`Compare is: ${row.city === text}`)
         return row.city.toLowerCase() === text.toLowerCase();
      });
   }
   else {
      var filteredData = data_
   }
   return filteredData
};

function updateState(data_) {
   
   inputElement = d3.select("input.state-input");

   var text = inputElement.property("value");

   if ( text != '' ) {
      var filteredData = data_.filter(function (row) {
         return row.state.toLowerCase() === text.toLowerCase();
      });
   }
   else {
      var filteredData = data_
   }
   return filteredData
};

function updateCountry(data_) {
   
   inputElement = d3.select("input.country-input");

   var text = inputElement.property("value");

   if ( text != '' ) {
      var filteredData = data_.filter(function (row) {
         return row.country.toLowerCase() === text.toLowerCase();
      });
   }
   else {
      var filteredData = data_
   }
   return filteredData
};

function updateShape(data_) {
   
   inputElement = d3.select("input.shape-input");

   var text = inputElement.property("value");

   if ( text != '' ) {
      var filteredData = data_.filter(function (row) {
         return row.shape.toLowerCase() === text.toLowerCase();
      });
   }
   else {
      var filteredData = data_
   }
   return filteredData
};

