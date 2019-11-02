const BaseService = require('./base-service')
const EventModel = require('../models/event')

class EventService extends BaseService {
    constructor() {
        super(EventModel, `${__dirname}/../event-database.json`)
    }
}

module.exports = new EventService()
