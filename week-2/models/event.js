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
        type : Object,
        required: false,
        gift: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Gift',
            autopopulate: {
                maxDepth: 1
            }
        },
        submittedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            autopopulate: {
                maxDepth: 1
            }
        }

    }],
})

EventSchema.plugin(require('mongoose-autopopulate'))

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel






