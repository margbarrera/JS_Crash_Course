const shortid = require('shortid');
const Database = require('./database'); 
const common = require('./common')



module.exports = class Gift {
    constructor(name, price, url = 'no-url') {
        this.name = name
        this.id = shortid.generate()
        this.price = price
        this.url = url
        this.tags = []
        Database.saveObject(this)
    }


    assignTag(tag) {
        this.tags.push(tag)
    }

    removeTag(tag) {
        this.tags = this.tags.filter(item => item !== tag)
    }

    getTags(){
        return this.tags
    }


}

