const common = require('../common')
const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    birthday: {
            type: Number,
            required: true,
        },
    pastGifts: {
            type: Array,
            required: true,
        },
     creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
                maxDepth: 1
                }
        },

})

FriendSchema.plugin(require('mongoose-autopopulate'))

const FriendModel = mongoose.model('Friend', FriendSchema)

module.exports = FriendModel



// module.exports = class Friend {
//     constructor(name, birthday, id = '', pastGifts = [], tags = []) {
//         this.name = name
//         this.birthday = birthday
//         this.id = id
//         this.pastGifts = pastGifts
//         this.tags = tags

//     }

//     assignTag(tag) {
//         this.tags.push(tag)
//     }

//     removeTag(tag) {
//         this.tags = this.tags.filter(item => item !== tag)
//     }

//     getTags(){
//         return this.tags
//     }

//     getPastGifts() {
//         return this.pastGifts
//     }

//     static create({ name, birthday, id, pastGifts, tags }) {
//         return new Friend(name, birthday, id, pastGifts, tags)
//     }
// }