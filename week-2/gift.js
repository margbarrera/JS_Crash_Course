const shortid = require('shortid');



module.exports = class Gift {
    constructor(name, price, url = 'no-url') {
        this.name = name
        this.id = shortid.generate()
        this.price = price
        this.url = url
        this.giftedToArchive = []
        this.tags = []
        allTheObjects.push(this)
    }

    assignTag(tag) {
        this.tags.push(tag)
    }
}