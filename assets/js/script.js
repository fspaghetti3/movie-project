const API_KEY = "47d7119b1ceef15064fd4cc997c6f5bb";
const BASE_URL = "https://api.themoviedb.org/3";

const OMDB_API_KEY = "16d4bde8";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Q3MTE5YjFjZWVmMTUwNjRmZDRjYzk5N2M2ZjViYiIsInN1YiI6IjY1MWIxOGE2ZWE4NGM3MDBlYjlhNTdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rCk2cFWbH8KUntzb4n457mmW7rG73VSOxMMd8gAOrLc",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  fetchPopularMovies();
  handleMovieDetailsPage();

  document
    .getElementById("searchBar")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const query = event.target.value;
        if (query) {
          searchMovies(query);
        }
      }
    });
});

function showWL() {
  document.querySelector(".open-watchlist").style.display = "none";
  document.querySelector(".watchlist-containerMd").style.display = "block";
}

function hideWL() {
  document.querySelector(".open-watchlist").style.display = "block";
  document.querySelector(".watchlist-containerMd").style.display = "none";
}

function fetchPopularMovies() {
  fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    options
  )
    .then((response) => response.json())
    .then((data) => displayResults(data.results))
    .catch((err) => console.error(err));
}

function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayResults(data.results))
    .catch((error) => console.error("Error: " + error));
}

function fetchBoxOffice(title) {
  const OMDB_URL = `http://www.omdbapi.com/?t=${encodeURIComponent(
    title
  )}&apikey=${OMDB_API_KEY}`;

  fetch(OMDB_URL)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.BoxOffice) {
        document.querySelector(
          ".movie-box-office"
        ).innerText = `Domestic Box Office Gross: ${data.BoxOffice}`;
      } else {
        console.error("Couldn't fetch box office data from OMDb.");
      }
    })
    .catch((error) =>
      console.error("Error fetching box office info from OMDb:", error)
    );
}

function handleMovieDetailsPage() {
  if (document.querySelector(".movie-poster")) {
    const urlParam = new URLSearchParams(window.location.search);
    const movieID = urlParam.get("id");

    if (movieID) {
      const moviePosters = document.querySelectorAll(".movie-poster");
      if (moviePosters.length) {
      }
      fetch(`${BASE_URL}/movie/${movieID}`, options)
        .then((response) => response.json())
        .then((movie) => {
          const posterURL =
            "https://image.tmdb.org/t/p/w500" + movie.poster_path;

          moviePosters.forEach((posterElement) => {
            posterElement.src = posterURL;
          });

          document.querySelector(".movie-title").innerText = movie.title;
          document.querySelector(".movie-description").innerText =
            movie.overview;

          document.querySelector(
            ".movie-release"
          ).innerText = `Release Date: ${movie.release_date}`;
          document.querySelector(
            ".movie-runtime"
          ).innerText = `Runtime: ${movie.runtime} minutes.`;

          const genreNames = movie.genres.map((genre) => genre.name).join(", ");
          document.querySelector(
            ".movie-genres"
          ).innerText = `Genres: ${genreNames}`;

          fetchBoxOffice(movie.title);
        });
    }
  }
}
//
function displayResults(movies) {
  const cards = document.querySelectorAll(".card");
  movies.slice(0, cards.length).forEach((movie, index) => {
    const card = cards[index];
    card.querySelector(".movie-poster").src =
      "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    card.querySelector(".movie-title").innerText = movie.title;
    card.querySelector(".movie-description").innerText = movie.overview;
    const existingRating = card.querySelector(".movie-rating");
    if (existingRating) {
      card.removeChild(existingRating);
    }
    const ratingEl = document.createElement("p");
    ratingEl.className = "movie-rating text-white font-bold bg-[#3D0000] text-xl rounded-md border-4 border-black m-5 ";
    ratingEl.innerText = `TMDB Rating: ${parseFloat(
      movie.vote_average * 10
    ).toFixed(1)}%`;
    cards[index].appendChild(ratingEl);
    const movieLink = cards[index].querySelector(".movie-link");
    movieLink.href = `/movie-details.html?id=${movie.id}`;
  });
}

function showFilters() {
  document.querySelector(".filters-containerLg").style.display = "block";
}
//   Hides filters List on click of EXIT FILTERS button
function hideFilters() {
  if (document.querySelector(".filters-containerLg").style.display == "block") {
    document.querySelector(".filters-containerLg").style.display = "none";
  }
}

// Shows Watch List on button click
function showWL() {
  document.querySelector(".open-watchlist").style.display = "none";
  document.querySelector(".watchlist-containerMd").style.display = "block";
}
// Hides Watch List on click of X button HEllO
function hideWL() {
  document.querySelector(".open-watchlist").style.display = "block";
  document.querySelector(".watchlist-containerMd").style.display = "none";
}

// Updates Watchlist upon click of pin and saves in local storage
let pinWatchlistBtn = document.querySelector(".pinned");

document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("pinned")) {
    var cardInfo = event.target.closest(".card");
    var cardValue = cardInfo.querySelector(".movie-title").textContent;
    var storeName = JSON.parse(localStorage.getItem("listName")) || [];
    storeName.push(cardValue);
    localStorage.setItem("listName", JSON.stringify(storeName));

    var savedWatchlist = document.getElementById("watchlist");

    for (let i = 0; i < storeName.length; i++) {
      const element = storeName[i];
      var createdItem = document.createElement("li");
      createdItem.textContent = element;
      savedWatchlist.appendChild(createdItem);
    }
  }
});
