// http://www.omdbapi.com/?i=tt3896198&apikey=55b6a4c3

// redirect to fav page
function redirectTofavPage() {
  window.location.href = "favourite.html";
}

function redirectToSearchPage(){
  window.location.href = "searchmovie.html";
}

// Get elements from the DOM
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// Function to load movies from the API
async function loadMovies(searchTerm) {
const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=55b6a4c3`;
const res = await fetch(URL);
const data = await res.json();

if (data.Response === 'True') {
  displayMovieList(data.Search);
}
}

// Function to find movies based on user input
function findMovies() {
let searchTerm = movieSearchBox.value.trim();

if (searchTerm.length > 0) {
  searchList.classList.remove('hide-search-list');
  loadMovies(searchTerm);
} else {
  searchList.classList.add('hide-search-list');
}
}

// Function to display the list of movies
function displayMovieList(movies) {
searchList.innerHTML = '';

for (let idx = 0; idx < movies.length; idx++) {
  let movieListItem = document.createElement('div');
  movieListItem.dataset.id = movies[idx].imdbID;
  movieListItem.classList.add('search-list-item');

  let moviePoster = movies[idx].Poster !== 'N/A' ? movies[idx].Poster : 'image_not_found.jpg';

  movieListItem.innerHTML = `
    <div class="search-item-thumbnail">
      <img src="${moviePoster}">
    </div>
    <div class="search-item-info">
      <h3>${movies[idx].Title}</h3>
      <p>${movies[idx].Year}</p>
    </div>
  `;

  searchList.appendChild(movieListItem);
}

loadMovieDetails();
}

// Function to load movie details when a movie is clicked
function loadMovieDetails() {
const searchListMovies = searchList.querySelectorAll('.search-list-item');

searchListMovies.forEach(movie => {
  movie.addEventListener('click', async () => {
    searchList.classList.add('hide-search-list');
    movieSearchBox.value = '';

    const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=55b6a4c3`);
    const movieDetails = await result.json();

    displayMovieDetails(movieDetails);
  });
});
}

// Function to display the details of a movie

let favmovieArray = [];

function displayMovieDetails(details) {
resultGrid.innerHTML = `
  <div class="movie-poster">
    <img src="${details.Poster !== 'N/A' ? details.Poster : 'image_not_found.jpg'}" alt="movie poster">
  </div>
  <div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
      <li class="year">Year: ${details.Year}</li>
      <li class="rated">Ratings: ${details.Rated}</li>
      <li class="released">Released: ${details.Released}</li>
    </ul>
    <p class="genre"><b>Genre:</b> ${details.Genre}</p>
    <p class="writer"><b>Writer:</b> ${details.Writer}</p>
    <p class="actors"><b>Actors:</b> ${details.Actors}</p>
    <p class="plot"><b>Plot:</b> ${details.Plot}</p>
    <p class="language"><b style="color: white;">Language:</b> ${details.Language}</p>
    <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
    <button id="add_watchlist" class="fav-btn">+ Add to watchlist</button>
    <button onclick="redirectTofavPage()" class="fav-btn" style="background-color: transparent; border: 1px solid white; text-align: center; width: auto; margin-left: 10px ;">Watchlist</button>
  </div>
`;


// code to add in favorite section
const addBtn = document.getElementById('add_watchlist');

addBtn.addEventListener('click',()=>{
  console.log("Movie added");
  // console.log(details);
  favmovieArray.push(details);
  let jsonString = JSON.stringify(favmovieArray);
  localStorage.setItem('favmovData',jsonString);
});

}

// Event listener to hide search list when clicking outside the search box
window.addEventListener('click', (event) => {
if (event.target.className !== 'form-control') {
  searchList.classList.add('hide-search-list');
}
});


























// disbale right click

// document.addEventListener('contextmenu', function (event) {
//   event.preventDefault();
// });
// document.onkeydown = function(e) {
//   if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {//Alt+c, Alt+v will also be disabled sadly.
//       alert('Sorry code copying is not allowed. Be creative!');
//   }
//   return false;
// };





