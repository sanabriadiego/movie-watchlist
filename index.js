const inputEl = document.getElementById("search-bar-input")
const searchBtn = document.getElementById("search-bar-btn")
const moviesList = document.getElementById("search-result")
//Every time we go back to this page, the array gets empty. So at the moment we try to update the localStorage we lose the previous values.
let watchlistArray = []

searchBtn.addEventListener("click", searchList)

function searchList(){
    moviesList.innerHTML = ``   
    fetch(`http://www.omdbapi.com/?s=${inputEl.value}&apikey=d2509b14`)
        .then(response => response.json())
        .then(data => {
            //We get an object that includes an array for all the movies that match with the result (data.Search)
            const moviesArray = data.Search
            for(let i=0; i<moviesArray.length; i++){
                //Each movie has its own ID, so we use it to get all the details for that movie.
                const movieID = moviesArray[i].imdbID
                searchDetails(movieID)
            }
        })
        .catch(err => {
            // This is where I can handle the error
            moviesList.innerHTML = `
                <span class="section-movies-list-error-message">Unable to find what you’re looking for. Please try another search.</span>
            `
        })
}

function searchDetails(id){
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=d2509b14`)
        .then(response => response.json())
        .then(data => {
            const movie = `
            <div class="movie-container">
                <img src="${data.Poster}"/>
                <div class="movie-container-details">
                    <div class="movie-container-details-title-rating">
                        <div class="movie-container-details-title">${data.Title}</div>
                        <div class ="movie-container-details-rating"><i class="fa-solid fa-star"></i>${data.imdbRating}</div>
                    </div>
                    <div class="movie-container-details-runtime-genre-watchlist">
                        <div class="movie-container-details-runtime">${data.Runtime}</div>
                        <div class="movie-container-details-genre">${data.Genre}</div>
                        <span class="movie-container-details-watchlist" onclick = addWatchlist("${id}")><i class="fa-solid fa-circle-plus"></i>Watchlist</span>
                    </div>
                    <div class="movie-container-details-plot">${data.Plot}</div>
                </div>
            </div>
        `
            moviesList.innerHTML += movie
            
        })
}

function addWatchlist(id){
    watchlistArray.push(id)
    localStorage.setItem("myMovies", JSON.stringify(watchlistArray))
}

