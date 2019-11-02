const BaseService = require('./base-service')
const GiftModel = require('../models/gift')

class GiftService extends BaseService {
    constructor() {
        super(GiftModel, `${__dirname}/../gift-database.json`)
    }
}

module.exports = new GiftService()
