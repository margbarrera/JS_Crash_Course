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

// I NEED TO CHANGE THIS CAUSE IT IS UGLY AND CONVOLUTED (but it works so I can take my time)

const checkObjectListContainsValue = async function (obj, list, value) {
    const model = obj.constructor
    let query = {'_id': obj._id}
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



// esempio cerca se in un evento la guestlist contiene guest
// eventModel.countDocuments({
//     '_id': event._id,
//     guestList: { '$in': [guest] }
// });

// checkIfObjectListContainsObjectWithValue = async function (obj, list, subprop, value)
// UserModel.countDocuments({
//     '_id': user._id,
//     list: {
//         '$elemMatch': { subprop: { '$exists': true, '$in': [value] } }
//     }
// });

// esempio cerca se in un evento la lista dei regali contiene un regalo con id
// EventModel.countDocuments({
//     '_id': event._id,
//     'giftlist': {
//         '$elemMatch': { 'gift': { '$exists': true, '$in': [id] } }
//     }
// });




module.exports = { print, dontPrint, echo, checkObjectListContainsValue, checkObjectListContainsNestedValue }