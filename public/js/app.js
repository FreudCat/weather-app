const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" //have to have the https:// in front of the url else it will append to the current local host and give you an error. 
let apiKey;

let d = new Date()//gets current date and time 
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

const postBtn = document.getElementById("post-info-btn");

//variables used to hold user input and weather data 
let zipcode = document.getElementById("zip");
let feelings = document.getElementById("feelings");
let content = document.getElementById("content");
let temp = document.getElementById("temp");

//variables used to update the DOM
const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");
const zipDiv = document.getElementById("user-zip"); 

postBtn.addEventListener("click", function (e) {
  if (zipcode.value && feelings.value) {
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
    })
    .then(function () {
      showData();  // chaining another promise to GET the data that was posted and use it to update the DOM. 
    }); 
  } else {

  }
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
  const response = await fetch(url, {  // the following is the usual data needed for a post 
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

const showData = async () => { //Data has already been posted, now it needs to be retrieved to update the DOM
  try {
    let fetchApiInfo = await fetch("/userEntry"); //this corresponds with a GET request on the server-side. Note the fetch and GET needs to use the same url. 
    let finalData = await fetchApiInfo.json();
    console.log(finalData); 
    zipDiv.innerHTML = finalData.zip; 
    dateDiv.innerHTML = finalData.date;  
    tempDiv.innerHTML = finalData.temp; 
    contentDiv.innerHTML = finalData.feelings; 
  } catch (err) {
    console.log("error", err); 
  }
}


