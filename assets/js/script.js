const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2Q3MTE5YjFjZWVmMTUwNjRmZDRjYzk5N2M2ZjViYiIsInN1YiI6IjY1MWIxOGE2ZWE4NGM3MDBlYjlhNTdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rCk2cFWbH8KUntzb4n457mmW7rG73VSOxMMd8gAOrLc'
  }
};

document.addEventListener('DOMContentLoaded', function(){

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(response => response.json())
  .then(data => {
      const movies = data.results;
      const cards = document.querySelectorAll('.card');

      for (let i = 0; i < cards.length; i++) {
          if (movies[i]) {
              const movie = movies[i];
              cards[i].querySelector('.movie-poster').src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
              cards[i].querySelector('.movie-title').innerText = movie.title;
              cards[i].querySelector('.movie-description').innerText = movie.overview;

              const movieLink = cards[i].querySelector('.movie-link');
              movieLink.href = `/movie-details.html?id=${movie.id}`;
          }
      }
  })
  .catch(err => console.error(err));


  if(document.querySelector('.movie-poster')) {
    const urlParam = new URLSearchParams(window.location.search);
    const movieID = urlParam.get('id');

    if (movieID) {
      fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)
        .then(response => response.json())
        .then(movie => {
          document.querySelector('.movie-poster').src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
          document.querySelector('.movie-title').innerText = movie.title;
          document.querySelector('.movie-description').innerText = movie.overview;
        })
    }
  }





});