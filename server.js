const express = require("express"); //use the express library -> "require" is like saying "import" in css. "express" is now reference to the module 
const bodyParser = require("body-parser"); //middleware to handle POST req. Extracts body portion of incoming req and allows it to be read on req.body. Deprecated - see below 
const cors = require ("cors"); //Cross-Origin Resource Sharing; middleware; allows config of web API security - allow other domains to make requests again this api. ex - if web API on one server and web app on another,  configure CORS in Web API to allow web app to make calls to web API.

const app = express(); //create app of the reference module 
const port = 8000; //determining a port number 

let projectData = []; 

app.use(cors()); 

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  //previously used app.use(bodyparser.json()); 


app.use(express.static("public")); //points express app to public folder with the html, css, and js.  



app.get("/", (req, res) => {  //this is a route definition. The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root. The callback function takes a request and a response object as arguments, and calls send() on the response to return the string "Hello World!"
  res.send("hello!"); 
}); 

app.listen(port, () => { //starts the server 
  console.log(`Example log is listening on ${port}`); 
}); 
