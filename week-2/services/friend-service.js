const BaseService = require('./base-service')
const FriendModel = require('../models/friend')

class FriendService extends BaseService {
    constructor() {
        super(FriendModel, `${__dirname}/../friend-database.json`)
    }
}

module.exports = new FriendService()
