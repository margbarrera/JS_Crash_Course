const BaseService = require('./base-service')
const CalendarModel = require('../models/calendar')

class CalendarService extends BaseService {
    constructor() {
        super(CalendarModel, `${__dirname}/../calendar-database.json`)
    }
}

module.exports = new CalendarService()
