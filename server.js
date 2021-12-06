// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const bodyParser = require('body-parser');
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

/** Listen Port */
const port = 4848;
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});


app.get('/getData', (request, response) => {
    response.send(projectData);
    projectData=[];
});


app.post('/postData', (request, response) => {
    //Post Data Now
    console.log(request.body);
    newEelement = {
        temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
    };
    projectData.push(newEelement);
    response.send(projectData);
});