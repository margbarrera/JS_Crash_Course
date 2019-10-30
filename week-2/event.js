const shortid = require('shortid');
const Database = require('./database'); 
const common = require('./common')


// New Class: Event


// TO DO: i should see that just the guests can read the guest list and the gift list

module.exports = class Event {
    constructor(name, giftee, date) {
        this.name = name
        if(giftee.id) { this.giftee = giftee.id
        } else { this.giftee = giftee }
        this.date = date
        this.id = shortid.generate()
        this.guestList = []
        this.giftList = []
        Database.saveObject(this)
    }

    inviteGuest(guest) {
        if(guest.id != this.giftee) {
            this.guestList.push(guest.id)
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
        this.guestList.forEach(x => common.print(Database.getData(x).name))
    }
    readGiftList() {
        common.print(`Gifts:`)
        this.giftList.forEach(x => common.print(Database.getData(x).name))
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

}