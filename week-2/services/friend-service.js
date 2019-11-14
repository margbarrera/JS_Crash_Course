const BaseService = require('./base-service')
const FriendModel = require('../models/friend')

class FriendService extends BaseService {
    constructor() {
        super(FriendModel)
    }
}

module.exports = new FriendService()
