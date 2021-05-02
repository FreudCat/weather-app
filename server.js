


const express = require("express"); //use the express library -> "require" is like saying "import" in css. "express" is now reference to the module 
const bodyParser = require("body-parser"); //middleware to handle POST req. Extracts body portion of incoming req and allows it to be read on req.body. Deprecated - see below 
const cors = require ("cors"); //Cross-Origin Resource Sharing; middleware; allows config of web API security - allow other domains to make requests again this api. ex - if web API on one server and web app on another,  configure CORS in Web API to allow web app to make calls to web API.
const API_KEY = process.env.API_KEY; //API - application program interface - web api contains predefined rules for interacting with the web app's data. Web "app" or application server is collection of programming logic required to deliver the dynamic content to user, and a bunch of other tasks that user's don't need to see (take payments, update inventory, etc). 

const app = express(); //create app of the reference module 
const port = 2000; //determining a port number 

let projectData = {}; //projectData object

app.use(cors()); 

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  //previously used app.use(bodyparser.json()); 

app.use(express.static("public")); //points express app to public folder with the html, css, and js.  

app.listen(port, () => { //starts the server 
  console.log(`Example log is listening ${port}`); 
}); 

app.get('/userEntry', (req, res) => {
  res.send(JSON.stringify(projectData)); 
});

app.post("/weatherData", (req, res) => { //url needs to match the url in the app.js page. 
  let data = req.body; //request, and req.body gets information from the body? 
  let newEntry = {
    date: data.date, 
    temp: data.temp, 
    feelings: data.feelings // collects the specific info from the data from the req.body; 
  }
  console.log(req.body); 
  projectData = newEntry; //adds the new info into the projectData object
}); 

