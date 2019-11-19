const common = require('../common')

const mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema({

    creator: {
        type: String,
        required: true,
    },
    entries: {
        type: Array,
        required: false,
    }
})

CalendarSchema.plugin(require('mongoose-autopopulate'))

const CalendarModel = mongoose.model('Calendar', CalendarSchema)

module.exports = CalendarModel




// module.exports = class Calendar {
//     constructor( entries = []) {
//         this.entries = entries
//     }

//      addEntry(name, date) {
//         this.entries[name] = date
//     }

//     getUpcomingEvent() {
//                 let minimumD = 1000;
//                 let upcomingEvent;
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0);
//                 let dayValueString = today.getDate().toString();
//                 const currentDate = (today.getMonth()+1)+'.'+ dayValueString.padStart(2,'0');
        
//                 for(var property in this.entries) {
//                     let d = this.entries[property] - currentDate
//                     if (d < 0) {
//                         d = d + 12.00
//                     }
//                     if (d < minimumD) {
//                         minimumD = d;
//                         upcomingEvent = `${property}, on ${this.entries[property]}`
//                     }
//                 }
//                 if(upcomingEvent != undefined) {
//                     common.print(`Next gift-giving occasion is ${upcomingEvent}. Hurry up!`)
//                 } else { common.print(`No upcoming events.`)}
        
//                 return upcomingEvent
//             }

//             static create({ entries }) {
//                 console.log('inside the create function, entries are: '+entries)
//                 return new Calendar(entries)
//             }
// }