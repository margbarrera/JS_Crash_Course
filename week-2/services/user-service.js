const BaseService = require('./base-service')
const UserModel = require('../models/user')

class UserService extends BaseService {
    constructor() {
        super(UserModel)
    }

    async addFriend(user, friend) {
        user.socialCircle.push(friend)
        await user.save()
    }

    async unfriend(user, friend) {
         
        let index = user.socialCircle.findIndex(x => x == friend)
        user.socialCircle.splice(index, 1)
        await user.save()

    }

}

module.exports = new UserService()
