const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" //have to have the https:// in front of the url else it will append to the current local host and give you an error. 
const apiKey; //not included for security reasons 

let d = new Date()//gets current date and time 
console.log(d);
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); //Note +1 in order to get the actual month. 
let formattedTime = formatTime(d); 

const postBtn = document.getElementById("generate");

//variables used to hold user input and weather data 
let zipcode = document.getElementById("zip");
let feelings = document.getElementById("feelings");
let content = document.getElementById("content");
let temp = document.getElementById("temp");
let inputErr = document.getElementById("errorDiv"); 

//variables used to update the DOM
const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");
const zipDiv = document.getElementById("user-zip"); 
const contentHolder = document.getElementById("entryHolder"); 

postBtn.addEventListener("click", function (e) {
  e.preventDefault();
  inputErr.innerHTML = ""; 
  if (zipcode.value && feelings.value) {
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
    inputErr.innerHTML = "Please enter information for both requests"; 
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
    contentHolder.classList.add("content-holder-bkgrnd"); 
    dateDiv.innerHTML = `${finalData.date} ${formattedTime}`;
    tempDiv.innerHTML = `Current Temp: ${Math.round(finalData.temp)}&degF`; 
    contentDiv.innerHTML = `You are feeling ${finalData.feelings}.`; 
  } catch (err) {
    console.log("error", err); 
  }
}

function formatTime (d) { //changes time to 12hr format w/ AM/PM
  let hrs = d.getHours(); 
  let min = d.getMinutes(); 

  let ampm = hrs < 12 ? "AM" : "PM"; // practicing with ternary operators. If hrs is less than 12, then ampm = "AM", else it equals "PM"

  //changing to 12 hr format if 12 or later. 
  let moduloHrs = hrs % 12; 
  hrs = moduloHrs = 0 ? 12 : moduloHrs; //if modulo is 0, then the actual time is between 12 - 1 am, and we set hrs to 12 rather than 0 (as it would be in 24 hr time), else it is just equal to moduloHrs. 

  min = min < 10 ? "0" + min : min; //if minutes are less than 10, getMinutes() doesn't return the leading 0 so 10:07 actually looks like 10:7. This ternary operator adds the leading 0 so that it looks like 10:07. 

  let formattedTime = `${hrs}:${min} ${ampm}`; 
  return formattedTime; 
}

