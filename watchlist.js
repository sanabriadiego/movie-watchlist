const watchlistSection = document.getElementById("watchlist")
const myWatchlist = JSON.parse(localStorage.getItem("myMovies"))
console.log(myWatchlist)

renderWatchlist()

function renderWatchlist(){
    watchlistSection.innerHTML = ``

    if(myWatchlist.length === 0){
        watchlistSection.innerHTML = `
        <div class="section-movies-list-intro-container">
            <span class="section-movies-list-intro-container-warning">Your watchlist is looking a little empty...</span>
            <a href="./index.html" class="section-movies-list-intro-container-link"><i class="fa-solid fa-circle-plus"></i>Let's add some movies!</a>
        </div>
        `
    }

    for(let i=0; i<myWatchlist.length; i++){
        searchDetails(myWatchlist[i])
    }
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
                        <span class="movie-container-details-watchlist" onclick = removeWatchlist("${id}")><i class="fa-solid fa-circle-minus"></i>Remove</span>
                    </div>
                    <div class="movie-container-details-plot">${data.Plot}</div>
                </div>
            </div>
        `
            watchlistSection.innerHTML += movie
            
        })
}

//With this function we are calling the API for the 4th time, since we need to render all the values that are inside the array (myWatchlist)

function removeWatchlist(id){
    const index = myWatchlist.indexOf(id)
    if (index > -1) {
        myWatchlist.splice(index, 1)
    }
    localStorage.setItem("myMovies", JSON.stringify(myWatchlist))
    renderWatchlist()
}