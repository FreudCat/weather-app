const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" //have to have the https:// in front of the url else it will append to the current local host and give you an error. 
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}


const postBtn = document.getElementById("post-info-btn");

let zipcode = document.getElementById("zip"); 
let feelings = document.getElementById("feelings"); 
let content = document.getElementById("content"); 
let temp = document.getElementById("temp");
let date = document.getElementById("date");
  

