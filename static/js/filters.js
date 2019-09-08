// from data.js
var tableData = data;

// get unique values
function onlyUnique(value, index, self) {
   return self.indexOf(value) === index;
}

// categories
var shapes = tableData.map((d) => d.shape).filter(onlyUnique)
var cities = tableData.map((d) => d.city).filter(onlyUnique)
var states = tableData.map((d) => d.state).filter(onlyUnique)
var countries = tableData.map((d) => d.country).filter(onlyUnique)

// what to do when any field updates
function UpdateCities(text) {
   console.log(text);
   return null;
}
