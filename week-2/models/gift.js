const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common')



module.exports = class Gift {
    constructor(name, price, id = '', url = 'no-url', tags = []) {
        this.name = name
        this.price = price
        this.id = id
        this.url = url
        this.tags = tags

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

    static create({ name, price, id, url, tags }) {
        return new Gift( name, price, id, url, tags )
    }

    setUrl(url) {
        this.url = url
    }

}

