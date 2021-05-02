const express = require("express"); //use the express library -> "require" is like saying "import" in css. "express" is now reference to the module 
const bodyParser = require("body-parser"); //middleware to handle POST req. Extracts body portion of incoming req and allows it to be read on req.body. Deprecated - see below 
const cors = require ("cors"); //Cross-Origin Resource Sharing; middleware; allows config of web API security - allow other domains to make requests again this api. ex - if web API on one server and web app on another,  configure CORS in Web API to allow web app to make calls to web API. 

const app = express(); //create app of the reference module 
const port = 2000; //determining a port number 

let projectData = {}; //projectData object that acts that the API endpoint

app.use(cors()); 

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  //Since body-parser is deprecated, this line is used instead 
//app.use(bodyparser.json()); <-- Example of how I would have incorporated bodyparser middleware

app.use(express.static("public")); //points express app to public folder with the html, css, and js.  

app.listen(port, () => { //starts the server 
  console.log(`Example log is listening ${port}`); 
}); 

app.post("/weatherData", (req, res) => { //url needs to match the url in the app.js page. 
  let data = req.body; //request, and req.body gets information from the body? 
  let newEntry = {
    date: data.date, 
    zip: data.zip, 
    temp: data.temp, 
    feelings: data.userFeelings // collects the specific info from the data from the req.body; 
  }
  console.log(req.body); 
  projectData = newEntry; //adds the new info into the projectData object
}); 

app.get('/userEntry', (req, res) => { //GETS the object data that was previously posted and sends it back to the client-side via a reponse. 
  res.send(JSON.stringify(projectData)); 
});

