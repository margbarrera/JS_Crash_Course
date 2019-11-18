const common = require('../common')

const mongoose = require('mongoose')

const GiftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    price: {
            type: Number,
            required: true,
        },
    url: {
            type: String,
            required: false,
    },

})

GiftSchema.plugin(require('mongoose-autopopulate'))

const GiftModel = mongoose.model('Gift', GiftSchema)

module.exports = GiftModel



// module.exports = class Gift {
//     constructor(name, price, id = '', url = 'no-url', tags = []) {
//         this.name = name
//         this.price = price
//         this.id = id
//         this.url = url
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

//     static create({ name, price, id, url, tags }) {
//         return new Gift( name, price, id, url, tags )
//     }

//     setUrl(url) {
//         this.url = url
//     }

// }

