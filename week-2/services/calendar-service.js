const BaseService = require('./base-service')
const CalendarModel = require('../models/calendar')

class CalendarService extends BaseService {
    constructor() {
        super(CalendarModel)
    }

    async addEntries() {

        //      addEntry(name, date) {
        //         this.entries[name] = date
        //     }
    }

    async getUpcomingEvent() {}


}

module.exports = new CalendarService()
