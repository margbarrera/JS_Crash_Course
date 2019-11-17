const BaseService = require('./base-service')
const EventModel = require('../models/event')
const Common = require('../common')


class EventService extends BaseService {
    constructor() {
        super(EventModel)
    }


    async inviteGuest(event, guest) {

        if (await Common.containsObjectId(event.guestList, guest)) {
            Common.print('This person has already been invited.')
        } else {
            event.guestList.push(guest)
            Common.print(guest.name+' has been invited to '+event.name)
            await event.save()
        }

     }

     async removeGuest(event, guest) {

        if (await Common.containsObjectId(event.guestList, guest)) {
            let index = event.guestList.findIndex(x => x == guest)
            event.guestList.splice(index, 1)
            await event.save()
        } else {
            Common.print('There are no guests with an Id of '+guest)
        }
     }


     async checkInvitation(event, guest) {
        if (await Common.containsObjectId(event.guestList, guest)) {
            Common.print(guest.name +' is invited to the '+event.name+' event.')
            return true
        } else {
            Common.print(guest.name +' is not invited to the '+event.name+' event.')
            return false
        }
     }

     async checkIfGiftIsPresent(event, gift) {
        if (await Common.containsObjectId(event.giftList, gift)) {
            Common.print(gift.name +' is already present in the '+event.name+' gift list.')
            return true
        } else {
            Common.print(gift.name +' is not present in the '+event.name+' gift list.')
            return false
        }
     }

     async addGiftToEvent(event, user, gift) {
        if (await this.checkInvitation(event, user)) {
            if (await this.checkIfGiftIsPresent(event, gift)) { 
                Common.print('Somebody already bought this gift for this event. Try to think of somenthig else, it will be much more appreciated.')
            } else { 
                event.giftList.push(gift) 
                await event.save()
            }
        } else {
            common.print('The user must be invited to the event to be able to partecipate')
        }
    }

}

module.exports = new EventService()
