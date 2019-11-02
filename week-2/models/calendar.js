const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common')

module.exports = class Calendar {
    constructor(creator, id = '', entries = []) {
        this.creator = creator
        this.id = shortid.generate()
        this.entries = []
        // I WON'T NEED THIS ANYMORE I GUESS
        //Database.saveObject(this)

    }

    addEntry(name, date) {
        this.entries[name] = date
    }

    getUpcomingEvent() {
                let minimumD = 1000;
                let upcomingEvent;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const currentDate = (today.getMonth()+1)+'.'+today.getDate()
        
                for(var property in this.entries) {
                    let d = this.entries[property] - currentDate
                    if (d < 0) {
                        d = d + 12.00
                    }
                    if (d < minimumD) { minimumD = d; upcomingEvent = `${property}, on ${this.entries[property]}` }
                }
                if(upcomingEvent != undefined) {
                    common.print(`Next gift-giving occasion is ${upcomingEvent}. Hurry up!`)
                } else { common.print(`No upcoming events.`)}
        
                return upcomingEvent
            }

            static create({ creator, id, entries }) {
                return new Calendar(creator, id, entries)
            }
}