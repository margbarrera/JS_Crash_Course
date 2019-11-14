const BaseService = require('./base-service')
const CalendarModel = require('../models/calendar')

class CalendarService extends BaseService {
    constructor() {
        super(CalendarModel)
    }
}

module.exports = new CalendarService()
