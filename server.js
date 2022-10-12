/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
*  of this assignment has been copied manually or electronically from any other source
*  (including 3rd party web sites) or distributed to other students.
*
*  Name: Jiyoon Kim Student ID: 154653208 Date: Oct 12,2022
*
*  Online (Cyclic) Link:
*
********************************************************************************/

const fs = require('fs');

const multer = require("multer");
// import express
const express = require('express');

const path = require("path");

// require data-service.js module
const dataService = require('./data-service.js');

// listen on process.env.PORT || 8080
const port = process.env.PORT || 8080;

// create express app
const app = express();

// serve static files from the public directory
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

dataService.initialize().then(() => {
   // start the server
    app.listen(port, () => {
        console.log(`Express http server listening on ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// The route "/" must return the home.html file from the views folder
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// The route "/about" must return the about.html file from the views folder
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/students/add', (req, res) => {
    res.sendFile(__dirname + '/views/addstudent.html');
});

app.get('/images/add', (req, res) => {
    res.sendFile(__dirname + '/views/addimage.html');
});

app.post('/images/add',upload.single("imageFile"), (req, res) => {
    res.redirect('/images');
});

app.post('/students/add', (req, res) => {
    
    console.log(req.body);

    dataService.addStudent(req.body).then();
    res.redirect('/students');
});

fs.readdir("./public/images/uploaded", function (err, items) {
    console.log(items);

    for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
    }
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

    if(req.query.hasOwnProperty('status')){
        dataService.getStudentsByStatus(req.query.status).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: err });
        });
    }else if(req.query.hasOwnProperty('program')){
        dataService.getStudentsByProgramCode(req.query.program).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: err });
        });
    }else if(req.query.hasOwnProperty('credential')){
        dataService.getStudentsByExpectedCredential(req.query.credential).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: err });
        });
    }else{
        dataService.getAllStudents().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: err });
        });
    }    
});

// /students route
app.get('/students/:sid', (req, res) => {
    dataService.getStudentById(req.params.sid).then((data) => {
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

// /images route
app.get('/images', (req, res) => {
    fs.readdir('./public/images/uploaded', function(err, items) {

        let images = {};

        images["images"] = items;

        var result = JSON.stringify(images);


        res.json(JSON.parse(result));
    });
    
});

// catch all invalid routes
app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});