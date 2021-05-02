
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" //have to have the https:// in front of the url else it will append to the current local host and give you an error. 
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
let d = new Date()//gets current date and time 
console.log(d);
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
console.log(newDate);
let apiKey; 
const postBtn = document.getElementById("post-info-btn");

let zipcode = document.getElementById("zip");
let feelings = document.getElementById("feelings");
let content = document.getElementById("content");
let temp = document.getElementById("temp");


postBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(zipcode.value);
  console.log(feelings.value);
  getWeather(baseURL, zipcode, apiKey)
    .then(function (data) { //chaining a promise to do something with the data that was taken from the Web API. 
      postData("/weatherData",
        {
          date: newDate,
          zip: zipcode.value,
          temp: data.main.temp,
          userFeelings: feelings.value
        }) //this function will post data that we got from web api query. Takes a URL and an object (web api data). There should also be a POST on the server side with the same url/route. 
    });
});

const getWeather = async (baseURL, zipcode, apiKey) => { //Query a web API - pass base open weather url, zipcode from input, and apikey to openweather to get the information. Use async to let the function know we are going to write asynchronous code 
  let url = `${baseURL}${zipcode.value}${apiKey}`; //strings all elements together to make actual url 
  console.log(url);
  console.log("getweather initiated");
  try {
    const weatherInfo = await fetch(url); //a Promise that returns an object within "weatherInfo". "await" pauses code until data is obtained. Fetch often used w/ await. 
    const data = await weatherInfo.json();  //extract json body contect from the object, await used here, too. 
    console.log("get weather function data: " + JSON.stringify(data)); //stringify turns it into readable text w/ attribute value pair 
    return data; //the promise resolves and returns the information contained within data 
  } catch (err) {
    console.log("error", err);
  }
}

const postData = async (url, data) => {
  const response = await fetch(url, {  // usual data needed for post 
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const extractData = await response.json;
    console.log(extractData);
    return extractData;
  } catch (err) {
    console.log("error", err);
  }
}

