const API_KEY = '47d7119b1ceef15064fd4cc997c6f5bb';
const BASE_URL = 'https://api.themoviedb.org/3'

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Q3MTE5YjFjZWVmMTUwNjRmZDRjYzk5N2M2ZjViYiIsInN1YiI6IjY1MWIxOGE2ZWE4NGM3MDBlYjlhNTdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rCk2cFWbH8KUntzb4n457mmW7rG73VSOxMMd8gAOrLc",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      const cards = document.querySelectorAll(".card");

      for (let i = 0; i < cards.length; i++) {
        if (movies[i]) {
          const movie = movies[i];
          cards[i].querySelector(".movie-poster").src =
            "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          cards[i].querySelector(".movie-title").innerText = movie.title;
          cards[i].querySelector(".movie-description").innerText =
            movie.overview;

          const movieLink = cards[i].querySelector(".movie-link");
          movieLink.href = `/movie-details.html?id=${movie.id}`;
        }
      }
    })
    .catch((err) => console.error(err));

  if (document.querySelector(".movie-poster")) {
    const urlParam = new URLSearchParams(window.location.search);
    const movieID = urlParam.get("id");

    if (movieID) {
      fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)

        .then((response) => response.json())
        .then((movie) => {
          document.querySelector(".movie-poster").src =
            "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          document.querySelector(".movie-title").innerText = movie.title;
          document.querySelector(".movie-description").innerText =
            movie.overview;
        });
    }
  }
});

// Shows Watch List on button click
function showWL() {
  document.querySelector(".open-watchlist").style.display = "none";
  document.querySelector(".watchlist-containerMd").style.display = "block";
}
// Hides Watch List on click of X button
function hideWL() {
  document.querySelector(".open-watchlist").style.display = "block";
  document.querySelector(".watchlist-containerMd").style.display = "none";
}
// Shows filters List on click of FILTERS button
function showFilters() {
  document.querySelector(".filters-containerLg").style.display = "block";
}
// Hides filters List on click of EXIT FILTERS button
function hideFilters() {
  if (document.querySelector(".filters-containerLg").style.display == "block") {
    document.querySelector(".filters-containerLg").style.display = "none";
  }
}

// Expands filters
function expandFilter() {
  document.querySelector(".filtersI-I").style.display = "block";
}

// Hides expanded filters List on click of primary filter
function hideFiltersII() {
  if (document.querySelector(".filtersII").style.display == "block") {
    document.querySelector(".filtersII").style.display = "none";
  }
}

        .then(response => response.json())
        .then(movie => {
          document.querySelector('.movie-poster').src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
          document.querySelector('.movie-title').innerText = movie.title;
          document.querySelector('.movie-description').innerText = movie.overview;
        });
    }

    function displayResults(movies) {
      const cards = document.querySelectorAll('.card');

      movies.slice(0, cards.length).forEach((movie, index) => {
        cards[index].querySelector('.movie-poster').src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        cards[index].querySelector('.movie-title').innerText = movie.title;
        cards[index].querySelector('.movie-description').innerText = movie.overview;

        const movieLink = cards[index].querySelector('.movie-link')
        movieLink.href = `/movie-details.html?id=${movie.id}`
      });
    }
  }

  document.getElementById('searchBar').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      const query = event.target.value;
    if (query) {
      searchMovies(query);
    }
  }
  });

  function searchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
      displayResults(data.results)
    })
    .catch(error => {
      console.error('Error: ' + error)
    })
  }
});

