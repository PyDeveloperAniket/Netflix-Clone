const row = document.getElementById('row');
let parsedObject;
let favmovieArray = [];


const storedData = localStorage.getItem("favmovData");

if (storedData) {
  try {
    // Parse the JSON string back to an object
    parsedObject = JSON.parse(storedData);

    // Now you can use the parsedObject as a regular JavaScript object
    console.log(parsedObject);
    displayMovieDetails(parsedObject);

  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
} else {
  console.log("No data found in localStorage for the specified key.");
}

function displayMovieDetails(details) {
  // Clear the existing content of the 'row' element
  row.innerHTML = '';

  // Iterate through each movie in the array and display its details
  details.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.className = 'col';
    movieCard.innerHTML = `
    <div class="card-container" id="cardlist">        
    <div class="card" id="item">
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'image_not_found.jpg'}" class="card-img" alt="movie Poster" />
      <div class="card-body">
        <h2 class="name">${movie.Title}</h2>
        <h6 class="des"><span>Year :</span>${movie.Year}</h6>
        <button id="removeBtn" class="watchlist-btn" onclick="removeMovie('${movie.imdbID}')">Remove</button>             
      </div>
    </div>
  </div>
    `;

    // Append the movie card to the 'row' element
    row.appendChild(movieCard);
  });
}

function removeMovie(id) {
  console.log('Delete button is clicked');

  // Get the id of the movie
  const delID = id;
  console.log(delID);

  // Retrieve the existing data from Local Storage
  const storedData = localStorage.getItem("favmovData");

  if (storedData) {
    try {
      // Parse the JSON string back to an array of objects
      let favmovieArray = JSON.parse(storedData);

      // Find the index of the movie with the matching IMDb ID
      const indexToRemove = favmovieArray.findIndex((movie) => movie.imdbID === delID);

      if (indexToRemove !== -1) {
        // Remove the movie from the array
        favmovieArray.splice(indexToRemove, 1);

        // Update the Local Storage with the modified array
        localStorage.setItem("favmovData", JSON.stringify(favmovieArray));

        // Refresh the displayed movie details
        displayMovieDetails(favmovieArray);

        console.log(`Movie with IMDb ID ${delID} removed from Local Storage.`);
      } else {
        console.log(`Movie with IMDb ID ${delID} not found in the data.`);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.log("No data found in localStorage for the specified key.");
  }
}
