const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common');

const UserService = require('../services/user-service');
const GiftService = require('../services/gift-service');


// New Class: Event
// TO DO: i should see that just the guests can read the guest list and the gift list

module.exports = class Event {
    constructor(name, giftee, date, id = '', guestList = [], giftList = []) {
        this.name = name
        if(giftee.id) { this.giftee = giftee.id
        } else { this.giftee = giftee }
        this.date = date
        this.id = shortid.generate()
        this.guestList = []
        this.giftList = []
        //Database.saveObject(this)
    }

    inviteGuest(guest) {
        if(guest.id != this.giftee) {
            this.guestList.push(guest.id)
            /// NEED TO CHANGE THIS ONE BELOW AS WELL: I DON'T KNOW HOW
            guest.calendar.addEntry(this.name,this.date)
        } else { common.print(`You can't invite somebody to their own gift event. You would spoil the surprise!`)}
    }

    checkInvitation(guest) {
        if(this.guestList.includes(guest.id)) {
            return true
        } else { return false }
    }

    readGuestList(){
        common.print(`Guests:`)
        // TO BE CHANGED
        this.guestList.forEach(x => common.print(UserService.find(x).name))
    }
    readGiftList() {
        common.print(`Gifts:`)
         // TO BE CHANGED
        this.giftList.forEach(x => common.print(GiftService.find(x).name))
    }

    checkIfGiftIsPresent(gift) {
        if(this.giftList.includes(gift.id)) {
            return true
        } else { return false }
    }

    addGiftToEvent(user, gift) {
        if(this.checkInvitation(user)) {
            if(this.checkIfGiftIsPresent(gift)) { 
                common.print(`Somebody already bought this gift for this event. Try to think of somenthig else, it will be much more appreciated.`)
            } else {  this.giftList.push(gift.id)  }
        } else { common.print(`The user must be invited to the event to be able to partecipate`) }
    }

    static create({ name, giftee, date, id, guestList, giftList}) {
        return new Event(name, giftee, date, id, guestList, giftList)
    }
}