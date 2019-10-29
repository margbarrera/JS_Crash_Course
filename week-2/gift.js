const shortid = require('shortid');
const Database = require('./database'); 



module.exports = class Gift {
    constructor(name, price, url = 'no-url') {
        this.name = name
        this.id = shortid.generate()
        this.price = price
        this.url = url
        this.giftedToArchive = []
        this.tags = []
        Database.saveObject(this)
    }

    assignTag(tag) {
        this.tags.push(tag)
    }
}