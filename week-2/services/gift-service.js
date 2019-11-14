const BaseService = require('./base-service')
const GiftModel = require('../models/gift')

class GiftService extends BaseService {
    constructor() {
        super(GiftModel)
    }
}

module.exports = new GiftService()
