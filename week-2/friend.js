const shortid = require('shortid');
const Database = require('./database'); 
const common = require('./common')


module.exports = class Friend {
    constructor(name, birthday) {
        this.name = name
        this.birthday = birthday
        this.id = shortid.generate()
        this.pastGifts = []
        this.tags = []
        this.possibleGifts = []
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