/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Padmapriya PalaniSwamiNathan Student ID: 140193237 Date: 22-JUN-2024
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var collegeData = require("./modules/collegeData");

// Setup routes to serve HTML files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, './views/about.html'));
});

app.get('/htmlDemo', function(req, res) {
    res.sendFile(path.join(__dirname, './views/htmlDemo.html'));
});

// Setup routes for JSON data
app.get('/students', (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else {
        collegeData.getAllStudents().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    }
});

app.get('/tas', (req, res) => {
    collegeData.getTAs().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

app.get('/courses', (req, res) => {
    collegeData.getCourses().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

app.get('/student/:num', (req, res) => {
    collegeData.getStudentByNum(req.params.num).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

// Handle 404 errors for non-matching routes
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize the data and start the server
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("Server listening on port: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log("Failed to initialize data: " + err);
});
