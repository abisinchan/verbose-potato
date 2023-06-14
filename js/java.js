// Fetch quotes from API
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Get a random index within the data array
    var randomIndex = Math.floor(Math.random() * data.length);
    
    // Retrieve the random quote from the data
    var randomQuote = data[randomIndex].text;
    
    // Display the random quote on the webpage
    var quoteElement = document.getElementById("quote-container");
    quoteElement.textContent = randomQuote;
  });
