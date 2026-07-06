const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const first = document.querySelector(".first");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const last = document.querySelector(".last");
const pageNumbers = document.querySelector(".pageNumbers");
let currentPage = 1;
let totalPages = 0;


getMovies(APIURL,1);

async function getMovies(url,pageNumber=null) {
    if(pageNumber){
        url = url + "&page=" + pageNumber;
        currentPage = pageNumber;
    }

    const resp = await fetch(url);
    const respData = await resp.json();
    totalPages =Math.floor(respData.total_pages / 2);

    console.log(respData);
    

    showMovies(respData.results);
    updatePagination();
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    if (movies.length === 0) {
        main.innerHTML = "<h1>No results found</h1>";
        return;
    }

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm && searchTerm !== "") {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});
first.addEventListener("click",() => {

    getMovies(APIURL,1);
})
last.addEventListener("click",() => {
    getMovies(APIURL,totalPages);
});

prev.addEventListener("click", () => {
    if (currentPage > 1) {
        getMovies(APIURL, currentPage - 1);
    }
});

next.addEventListener("click", () => {
    if (currentPage < totalPages) {
        getMovies(APIURL, currentPage + 1);
    }
});
function updatePagination() {

    pageNumbers.innerHTML = "";

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
        start = 1;
        end = Math.min(5, totalPages);
    }

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {

        const li = document.createElement("li");

        li.textContent = i;

        if (i === currentPage) {
            li.classList.add("active");
        }

        li.addEventListener("click", () => {
            getMovies(APIURL, i);
        });

        pageNumbers.appendChild(li);
    }

    first.classList.toggle("hidden", currentPage === 1);
    prev.classList.toggle("hidden", currentPage === 1);

    last.classList.toggle("hidden", currentPage === totalPages);
    next.classList.toggle("hidden", currentPage === totalPages);
}