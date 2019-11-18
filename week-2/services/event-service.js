const BaseService = require('./base-service')
const EventModel = require('../models/event')
const Common = require('../common')


class EventService extends BaseService {
    constructor() {
        super(EventModel)
    }


    async inviteGuest(event, guest) {
        if ( await Common.checkObjectListContainsValue(event,'guestList',guest)) {
            Common.print('This person has already been invited.')
        } else {
            event.guestList.push(guest)
            Common.print(guest.name+' has been invited to '+event.name)
            await event.save()
        }
     }


     async removeGuest(event, guest) {
        if ( await Common.checkObjectListContainsValue(event,'guestList',guest)) {
            let index = event.guestList.findIndex(x => x._id == guest)
            event.guestList.splice(index, 1)
            await event.save()
        } else {
            Common.print('There are no guests with an Id of '+guest)
        }
     }


     async checkInvitation(event, guest) {
        if ( await Common.checkObjectListContainsValue(event,'guestList',guest)) {
            return true
        } else {
            Common.print(guest.name +' is not invited to the '+event.name+' event.')
            return false
        }
     }


     async checkIfGiftIsPresent(event, giftobj) {
        const dbcheck = await Common.checkObjectListContainsNestedValue(event, 'giftList', 'gift', giftobj._id)
        if ( dbcheck ) {
            Common.print(giftobj.name +' is already present in the '+event.name+' gift list.')
            return true
        } else {
            console.log(dbcheck)
            return false
        }
     }


     async addGiftToEvent ( event, userobj, giftobj ) {
        if ( await this.checkInvitation(event, userobj )) {
            if ( await this.checkIfGiftIsPresent(event, giftobj)) { 
                Common.print('Somebody already bought this gift for this event. Try to think of somenthig else, it will be much more appreciated.')
            } else { 
                const submittedGift = {gift : giftobj._id, submittedby : userobj._id}
                event.giftList.push(submittedGift) 
                await event.save()
            }
        } else {
            Common.print('The user must be invited to the event to be able to partecipate')
        }
    }

    // async removeGift(event, gift) {
    //     if (await Common.containsObjectAsValue(event.giftList, 'gift',gift)) {
    //         let index = event.giftList.findIndex(x => x.gift._id == gift._id)
    //         event.giftList.splice(index, 1)
    //         await event.save()
    //     } else {
    //         Common.print('There are no gifts with an Id of '+gift)
    //     }
    //  }

}

module.exports = new EventService()
