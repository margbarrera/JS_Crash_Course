const BaseService = require('./base-service')
const UserModel = require('../models/user')
const AccountService = require('./account-service')
const Common = require('../common')

class UserService extends BaseService {
    constructor() {
        super(UserModel)
    }

    async add(item) {
        const newUser = await UserModel.create(item)
        // should I call a new Service instead? --> see account-service
        //await CalendarModel.create({creator : newUser._id})
        return newUser
      }


    async addFriend(user, friend) {

        if (await Common.checkObjectListContainsValue(user,'socialCircle',friend)) {
            Common.print(friend.name+' is already a friend!')
        } else {
            user.socialCircle.push(friend)
            await AccountService.addToCalendar(user,`${friend.name} (birthday)`,friend.birthday)
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

    async assignGiftIdea(user, friend, gift) {

        const assignment = {'friend': friend._id, 'gift': gift._id}
        user.assignedGiftIdeas.push(assignment)
        console.log(user.name+' assigned '+gift.name+' to '+friend.name)
        await user.save()
        
    }
    // I HATE ALL OF THIS. THIS DOESNT WORK IT'S SO STUPID ARGH I WANT TO PUNCH COMPUTERS
    async getFriendGifts(user, friend) {

        const plannedGifts = user.assignedGiftIdeas
        const filteredGiftPairs = plannedGifts.filter(x => x.friend.equals(friend._id))
        const filteredGiftIds = filteredGiftPairs.map(x => x = x.gift)
        return filteredGiftIds
    }
}

module.exports = new UserService()
