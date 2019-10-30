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


module.exports = { print, dontPrint, echo }