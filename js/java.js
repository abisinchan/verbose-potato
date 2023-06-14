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


  // giphy api

  const api_key = "ct9FoYc2orZ7OGg0yzDIKfgCOaj5Ea7H";
const search_term = "positive+thoughts";
const limit = 25;
const num_display_gifs = 5;

// Fetch GIFs from GIPHY API
const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search_term}&limit=${limit}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract the list of GIF objects
    const gif_list = data.data;
    
    // Shuffle the list randomly
    shuffleArray(gif_list);
    
    // Select a desired number of GIFs
    const display_gifs = gif_list.slice(0, num_display_gifs);
    
    // Display the selected GIFs
    const gifContainer = document.getElementById("gifContainer");
    display_gifs.forEach(gif => {
      const gif_url = gif.images.fixed_height.url;
      const img = document.createElement("img");
      img.src = gif_url;
      gifContainer.appendChild(img);
    });
  })
  .catch(error => console.error(error));

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}