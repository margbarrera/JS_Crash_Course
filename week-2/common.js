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
// I NEED TO CHANGE THIS CAUSE IT IS UGLY AND CONVOLUTED (but iit works so I can take my time)
const containsObjectId = async function (list, obj) {
    let doesIt = false
    list.forEach(element => {
        if (element._id.equals(obj._id) ){
            doesIt = true        
        } else {
            doesIt = false }
    })
    return doesIt      
}


const containsObjectAsValue = async function (list, prop, obj) {
    let doesIt = false
    list.forEach( element => {
        let value = element[prop]
        if (value.equals(obj._id)) {
            doesIt = true
        } else {
            doesIt = false
        }
    })
    return doesIt
}



module.exports = { print, dontPrint, echo, containsObjectId, containsObjectAsValue }