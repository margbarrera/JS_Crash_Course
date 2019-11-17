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
    guestList: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
            }
    }],
    giftList: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Gift',
        autopopulate: {
            maxDepth: 1
            }
    }],
})

EventSchema.plugin(require('mongoose-autopopulate'))

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel




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


