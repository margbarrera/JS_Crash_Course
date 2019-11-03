const fs = require('fs')

let printing = true;

const dontPrint = function() {
    printing = false;
}

const print = function(x) {
    if (printing == true) { console.log(x)
    } else { }
}

const echo = function(x) {
    console.log(x)
    return x
}

const clearDB = function() {
    const path = "/Users/margheritabarrera/projects/JS_Crash_Course/week-2/";
    const db = [
        "friend-database.json",
        "event-database.json",
        "gift-database.json",
        "user-database.json",
        "calendar-database.json"
    ];
    for (file of db) {
        if (fs.existsSync(path + file)) {
            fs.unlinkSync(path + file, print)
        }
    }
}

module.exports = { print, dontPrint, echo, clearDB }