const BaseService = require('./base-service')
const FriendService = require('./friend-service')
const UserModel = require('../models/user')
const Common = require('../common')

class UserService extends BaseService {
    constructor() {
        super(UserModel)
    }



    async addFriend(user, friend) {
////////////////
// const newFriend = await FriendService.add(friend)
// user.socialCircle.push(newFriend)
////////////////

        if (await Common.checkObjectListContainsValue(user,'socialCircle',friend)) {
            Common.print(friend.name+' is already a friend!')
        } else {
            user.socialCircle.push(friend)
            await user.save()
        }
    }

    async unfriend(user, friend) {
         
        if (await Common.checkObjectListContainsValue(user,'socialCircle',friend)) {
            let index = user.socialCircle.findIndex(x => x == friend)
            user.socialCircle.splice(index, 1)
            await user.save()
        } else {
            Common.print('You have no friends with an Id of '+friend)
        }
    }

    async saveGiftIdea(user, gift) {
        
        if (await Common.checkObjectListContainsValue(user,'unassignedGiftIdeas',gift)) {
            Common.print('You already saved this item.')
        } else {
            user.unassignedGiftIdeas.push(gift)
            Common.print('You saved '+gift.name)
            await user.save()
        }
    }


    async discardGiftIdea(user, gift) {

         if (await Common.checkObjectListContainsValue(user,'unassignedGiftIdeas',gift)) {
            let index = user.unassignedGiftIdeas.findIndex(x => x == gift)
            user.unassignedGiftIdeas.splice(index, 1)
            Common.print('You discarded '+gift.name)

            await user.save()
        } else {
            Common.print('You have not saved any idea with an Id of '+gift)
        }
    }

}

module.exports = new UserService()
