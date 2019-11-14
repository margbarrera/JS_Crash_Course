const BaseService = require('./base-service')
const EventModel = require('../models/event')

class EventService extends BaseService {
    constructor() {
        super(EventModel)
    }
}

module.exports = new EventService()
