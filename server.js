/********************************************************************************* 
*  WEB322 – Assignment 02 
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source  
*  (including 3rd party web sites) or distributed to other students. 
*  
*  Name: Jiyoon Kim Student ID: 154653208 Date: Sept 28, 2022 
* 
*  Online (Cyclic) Link:  
* 
********************************************************************************/  

// import express
const express = require('express');

// require data-service.js module
const dataService = require('./data-service.js');

// listen on process.env.PORT || 8080
const port = process.env.PORT || 8080;

// create express app
const app = express();

// serve static files from the public directory
app.use(express.static('public'));

dataService.initialize().then(() => {
   // start the server
    app.listen(port, () => {
        console.log(`Express http server listening on ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

// The route "/" must return the home.html file from the views folder
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// The route "/about" must return the about.html file from the views folder
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

// /intlstudents route
app.get('/intlstudents', (req, res) => {
    dataService.getInternationalStudents().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err });
    });
});

// /students route
app.get('/students', (req, res) => {
    dataService.getAllStudents().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err });
    });
});

// /programs route
app.get('/programs', (req, res) => {
    dataService.getPrograms().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: err });
    });
});

// catch all invalid routes
app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});