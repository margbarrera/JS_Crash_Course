const common = require('../common');
const Calendar = require('./calendar');
const GiftService = require('../services/gift-service')
const Gift = require('./gift')

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    birthday: {
            type: Number,
            required: true,
        },
    socialCircle: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            autopopulate: {
                maxDepth: 1
                }
        }],

    unassignedGiftIdeas: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Gift',
        autopopulate: {
            maxDepth: 1
            }
    }],

    assignedGiftIdeas: {
        type: Array,
        required: false,
        },

    calendar: {
        type: Object,
        required: false,
    },
    
    pastGifts: {
        type: Array,
        required: false,
    },

})

UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel


// module.exports = class User {
//     constructor(name, birthday, id = undefined, socialCircle = [], unassignedGiftIdeas = [], assignedGiftIdea = [], calendar = {}, pastGifts = []) {
//         this.name = name
//         this.birthday = birthday
//         this.id = id
//         this.socialCircle = socialCircle
//         this.unassignedGiftIdeas = unassignedGiftIdeas
//         this.assignedGiftIdeas = assignedGiftIdea /*this will contain pairs in the form friend.id : gift.id */
//         this.calendar = calendar
//         this.pastGifts = pastGifts
//     }
   
//     async createCalendar() {
//         const userCal = new Calendar(this.id);
//         // await CalendarService.add(userCal);
//         this.calendar = userCal
//         return userCal
//     }






//     async assignGiftIdea(friend, gift) {
//         this.assignedGiftIdeas[friend.id] = gift.id
//     };

//     getAssignedGift(friend) {
//         return this.assignedGiftIdeas[friend.id];
//     }

//     async giftTheGift(friend, gift) {
//         if (!friend.getPastGifts().includes(gift.id)) {
//             if(gift.url == 'no-url') {
//                 common.print(`You are gifting ${friend.name} ${gift.name}.`)
//             } else {
//                 common.print(`You are buying ${friend.name} ${gift.name}. To buy it go over to: ${gift.url}`)
//         }
//             friend.pastGifts.push(gift.id);
//         } else {
//             common.print(`You already gifted ${friend.name} this item! NOT CUTE.`)
//             if (this.getAssignedGift(friend) != undefined) {
//                 const suggestion = this.getAssignedGift(friend);
//                 let alternativeGift = await GiftService.find(suggestion);
//                 common.print(`Why don't you buy him a ${ alternativeGift.name} instead?`)
//             }
//         }

//     }

//     static create({ name, birthday, id, socialCircle, unassignedGiftIdeas, assignedGiftIdea, calendar, pastGifts }) {
//         const user = new User(name, birthday, id, socialCircle, unassignedGiftIdeas, assignedGiftIdea, calendar, pastGifts )

//         user.calendar = Calendar.create(calendar)

//         return user    
        
//     }

// }