const BaseService = require('./base-service')
const CalendarModel = require('../models/calendar')
const Common = require('../common')

class CalendarService extends BaseService {
    constructor() {
        super(CalendarModel)
    }

    async addEntry(calendar,event,date) {

        calendar = await this.find(calendar)
        const entry = {date: date, event: event}
        calendar.entries.push(entry)
        await calendar.save()
    }

    async getUpcomingEvent(calendar) {

                let minimumD = 1000;
                let upcomingEvent;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                let dayValueString = today.getDate().toString();
                const currentDate = (today.getMonth()+1)+'.'+ dayValueString.padStart(2,'0');
        
                for(var property in calendar.entries) {
                    let d = calendar.entries[property].date - currentDate
                    if (d < 0) {
                        d = d + 12.00
                    }
                    if (d < minimumD) {
                        minimumD = d;
                        upcomingEvent = `${calendar.entries[property].event}, on ${calendar.entries[property].date}`
                    }
                }
                if(upcomingEvent != undefined) {
                    Common.print(`Next gift-giving occasion is ${upcomingEvent}. Hurry up!`)
                } else { Common.print(`No upcoming events.`)}
        
                return upcomingEvent






    }


}

module.exports = new CalendarService()
