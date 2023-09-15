//api key
const key = "WeuBJa9HNLhmZoKplI7HpFLsXKJzr8FR";

//날씨 가져오기
const getWeather = async (locationKey) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${locationKey}?apikey=${key}&language=ko-KR`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

//도시검색하기
const getCity = async (city) => {
  //사이트에서 제공하는 리소스 주소
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
  //api key 값과 city 도시명이 들어감
  const query = `?apikey=${key}&q=${city}`;
  //키값과 도시명으로 요청
  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

getCity("Busan")
  .then((data) => {
    return getWeather(data.Key); //api에서 불러오는 Key값(대문자!)
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
