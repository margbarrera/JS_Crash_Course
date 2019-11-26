const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({

    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    calendar: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
    }
})

AccountSchema.plugin(require('mongoose-autopopulate'))

const CalendarModel = mongoose.model('Account', AccountSchema)

module.exports = AccountSchema