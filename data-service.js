// import fs
const fs = require('fs');

var students = [];
var programs = [];

function addStudent(studentData) {
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

// getAllStudents()
function getStudentById(data) {
    return new Promise((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        let result = students.filter(function (n){
            return n.studentID==data;
        });

        resolve(result);
    });
}

// getAllStudents()
function getStudentsByStatus(data) {
    return new Promise((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        console.log(data);
        let result = students.filter(function (n){
            return n.status==data;
        });

        resolve(result);
    });
}


// getAllStudents()
function getStudentsByProgramCode(data) {
    return new Promise((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        console.log(data);
        let result = students.filter(function (n){
            return n.program==data;
        });

        resolve(result);
    });
}

// getAllStudents()
function getStudentsByExpectedCredential(data) {
    return new Promise((resolve, reject) => {
        if (students.length == 0) {
            reject("no results returned");
        }
        console.log(data);
        let result = students.filter(function (n){
            return n.expectedCredential==data;
        });

        resolve(result);
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
    getPrograms,
    getStudentsByStatus,
    getStudentsByProgramCode,
    getStudentsByExpectedCredential,
    getStudentById,
    addStudent
};