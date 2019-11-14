const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common');

const UserService = require('../services/user-service');
const GiftService = require('../services/gift-service');

const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    giftee: {
        type: String,
        required: true,
        minlength: 2
    },
    date: {
            type: Number,
            required: true,
        },
    guestList: {
            type: Array,
            required: false
    }

})

EventSchema.plugin(require('mongoose-autopopulate'))

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel

// module.exports = class Event {
//     constructor(name, giftee, date, id = '', guestList = [], giftList = []) {
//         this.name = name
//         if(giftee.id) { this.giftee = giftee.id
//         } else { this.giftee = giftee }
//         this.date = date
//         this.id = id
//         this.guestList = guestList
//         this.giftList = giftList
//     }

//     async inviteGuest(guest) {
//         if(guest.id != this.giftee) {
//             // CHANGED: THIS NOW PUSHES THE ACTUAL OBJ NOT JUST THE ID, since it makes it a lot easier to work with
//             this.guestList.push(guest)
//             // calendar is still a workinprogress
//             //guest.calendar.addEntry(this.name,this.date)
//         } else { common.print(`You can't invite somebody to their own gift event. You would spoil the surprise!`)}
//     }

//     checkInvitation(guest) {
//         if(this.guestList.includes(guest.id)) {
//             return true
//         } else { return false }
//     }

//     async getGuestList(){
//         common.print(`Guests:`)
//         // TO BE CHANGED AS IT CAN CONTAIN ALSO FRIENDS || also there's the async thing, shit -_-
//         for (let i=0; i< this.guestList.length; i++) {
//             let guest = await UserService.find(this.guestList[i]);
//             common.print(guest.name)
//         };
//     }

//     async getGiftList() {
//         common.print(`Gifts:`)
//          for (let i=0; i< this.giftList.length; i++) {
//             let guest = await GiftService.find(this.giftList[i]);
//             common.print(guest.name)
//         }
//     }

//     checkIfGiftIsPresent(gift) {
//         if(this.giftList.includes(gift.id)) {
//             return true
//         } else { return false }
//     }

//     addGiftToEvent(user, gift) {
//         if(this.checkInvitation(user)) {
//             if(this.checkIfGiftIsPresent(gift)) { 
//                 common.print(`Somebody already bought this gift for this event. Try to think of somenthig else, it will be much more appreciated.`)
//             } else {  this.giftList.push(gift.id)  }
//         } else { common.print(`The user must be invited to the event to be able to partecipate`) }
//     }

//     static create({ name, giftee, date, id, guestList, giftList}) {
//         return new Event(name, giftee, date, id, guestList, giftList)
//     }
// }