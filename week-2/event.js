const shortid = require('shortid');

// New Class: Event

// properties: name, giftee, date, guestlist, giftlist, wishlist(optional)

// everybody can be invited (but not the giftee naturally)
// users that are invited can submit the gift they decided to give for the occasion to the giftlist,
// duplicates are notified and rejected
// its date is automatically pushed to the calendar of the guests
// lists of guests and gifts can be read
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
        allTheObjects[this.id] = this
    }

    inviteGuest(guest) {
        if(guest.id != this.giftee) {
            this.guestList.push(guest.id)
            guest.calendar[this.name] = this.date
        } else { console.log(`You can't invite somebody to their own gift event. You would spoil the surprise!`)}
    }

    readGuestList(){
        console.log(`Guests:`)
        this.guestList.forEach(x => console.log(allTheObjects[x].name))
    }
    readGiftList() {
        console.log(`Gifts:`)
        this.giftList.forEach(x => console.log(allTheObjects[x].name))
    }

    checkIfGiftIsPresent(gift) {
        if(this.giftList.includes(gift.id)) {
            return true
        } else { return false }
    }

}