//Today's Card Variables:
let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let cityLocation = document.getElementById("location");
let todayDegree = document.getElementById("today-degree");
let todayIcon = document.getElementById("today-icon");
let description = document.getElementById("today-description");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let   searchBar = document.getElementById("search");

// api vairavle
 let apiResponse;
  let responseData;
    //Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay");
let nextDayIcon = document.getElementsByClassName("nextDay-icon");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let nextDayDescription = document.getElementsByClassName("nextDay-description");
 
 const monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
 const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];




  // get data from Api
async function getWeatherData(currentCity='cairo'){
  apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
   responseData= await apiResponse.json()
  console.log(responseData)
  displayTodayWeather();
  displayNextDayWeather()
}
getWeatherData();



function displayTodayWeather(){

 let date =new Date();
 console.log(date)
 today.innerHTML= days[date.getDay()];
 todayDate.innerHTML = `${date.getDate()} ${ monthName[date.getMonth()]}`;
 cityLocation.innerHTML =  responseData.location.name;
 todayDegree.innerHTML = responseData.current.temp_c;
 todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`)
 description.innerHTML = responseData.current.condition.text;
 humidty.innerHTML = responseData.current.humidity;
 wind.innerHTML = responseData.current.wind_kph;
 compass.innerHTML =responseData.current.wind_dir;

}



// console.log(days[new Date(2022-01-22).getDay()])

function displayNextDayWeather(){
  for( let i=0; i<nextDay.length;i++){
    nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
   nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
   maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
   minDegree[i].innerHTML =responseData.forecast.forecastday[i+1].day.mintemp_c;
   nextDayDescription[i].innerHTML =responseData.forecast.forecastday[i+1].day.condition.text;
  }
}
searchBar.addEventListener("keyup",function(){
  currentCity= searchBar.value;
 console.log( currentCity);
getWeatherData(currentCity);
})





