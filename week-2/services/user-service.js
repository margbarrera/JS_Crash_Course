const BaseService = require('./base-service')
const UserModel = require('../models/user')
const Common = require('../common')

class UserService extends BaseService {
    constructor() {
        super(UserModel)
    }

    async addFriend(user, friend) {

        if (await Common.containsObjectId(user.socialCircle, friend)) {
            console.log(friend.name+' is already a friend!')
        } else {
            user.socialCircle.push(friend)
            await user.save()
        }
    }

    async unfriend(user, friend) {
         
        if (await Common.containsObjectId(user.socialCircle, friend)) {
            let index = user.socialCircle.findIndex(x => x == friend)
            user.socialCircle.splice(index, 1)
            await user.save()
        } else {
            console.log('You have no friends with an Id of '+friend)
        }
    }

    async saveGiftIdea(user, gift) {
        
        if (await Common.containsObjectId(user.unassignedGiftIdeas, gift)) {
            console.log('You already saved this item.')
        } else {
            user.unassignedGiftIdeas.push(gift)
            console.log('You saved '+gift.name)
            await user.save()
        }
    }


    async discardGiftIdea(user, gift) {

         if (await Common.containsObjectId(user.unassignedGiftIdeas, gift)) {
            let index = user.unassignedGiftIdeas.findIndex(x => x == gift)
            user.unassignedGiftIdeas.splice(index, 1)
            console.log('You discarded '+gift.name)

            await user.save()
        } else {
            console.log('You have not saved any idea with an Id of '+gift)
        }
    }

}

module.exports = new UserService()
