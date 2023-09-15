//api주소
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=b26e63b3a64979f0db9795c26bcaaf12&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
//이미지
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
//검색기능
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b26e63b3a64979f0db9795c26bcaaf12&language=ko&query="';

const main = document.getElementById("main"); //모든영화 컨테이너
const form = document.getElementById("form"); // 상단 검색 폼
const search = document.getElementById("search"); // 검색 입력창

getMovies(API_URL);

//영화 검색
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //검색어
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    //검색한후 초기화
    search.value = "";
  } else {
    window.location.reload(); //아무것도 입력안하면 새로고침
  }
});

//async await 는 데이터를 가져올때까지 대기
async function getMovies(url) {
  const res = await fetch(url); //요청 url로 제이슨 형식 데이터를 받아옴
  const data = await res.json(); //json 객체로 변환한 데이터

  showMovies(data.results);
}

//showMovies 함수
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    //const { title, poster_path, vote_average, overview } = movie;
    //영화제목, 포스터주소, 평점, 오버뷰를 영화 데이터에서 받아서 저장
    const title = movie.title;
    const poster_path = movie.poster_path;
    const vote_average = movie.vote_average.toFixed(1); //소수점첫번째자리까지 자르기
    const overview = movie.overview;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>상세 보기</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}

//평점 색 나타내는 함수
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
