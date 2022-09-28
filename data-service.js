// import fs
const fs = require('fs');

var students = [];
var programs = [];

// initialize
function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', (err, data) => {
            if (err) {
                reject("unable to read file");
            }
            students = JSON.parse(data);
    
            // initialize programs
            fs.readFile('./data/programs.json', (err, data) => {
                if (err) {
                    reject("unable to read file");
                }
                programs = JSON.parse(data);
                resolve();
            });
        });
    });
}

// getAllStudents()
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        resolve(students);
    });
}

// getInternationalStudents()
function getInternationalStudents() {
    return new Promise((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        resolve(students.filter(student => student.isInternationalStudent));
    });
}

// getPrograms()
function getPrograms() {
    return new Promise((resolve, reject) => {
        if (programs.length == 0) {
            reject("no results returned");
        }
        resolve(programs);
    });
}

// export functions
module.exports = {
    initialize,
    getAllStudents,
    getInternationalStudents,
    getPrograms
};