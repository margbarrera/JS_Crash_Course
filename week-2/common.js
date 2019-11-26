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


const checkObjectListContainsValue = async function (obj, list, value) {
    const model = obj.constructor
    let query = {'_id': obj._id}
// building the query with dynamically specified keys because otherwise i cannot pass args to query
    query[list] = { '$in': [value] }
    const queryCount = model.countDocuments(query);
    return queryCount
}


const checkObjectListContainsNestedValue = async function (obj, list, subprop, value){
    const model = obj.constructor
    // E.g. look for an object with gift:id in the giftLit for an event
    // EventModel.countDocuments({
    //     '_id': event._id,
    //     'giftlist': {
    //         '$elemMatch': { 'gift': { '$exists': true, '$in': [id] } }
    //     }
    // });
    // building the query with dynamically specified keys because otherwise i cannot pass args to query
    let query = {'_id': obj._id }
    query[list] = {'$elemMatch' : {}}
    query[list]['$elemMatch'][subprop] = {
        '$exists': true, '$in': [value]
    }
    const queryCount = await model.countDocuments(query)
    return queryCount
}






module.exports = { print, dontPrint, echo, checkObjectListContainsValue, checkObjectListContainsNestedValue }