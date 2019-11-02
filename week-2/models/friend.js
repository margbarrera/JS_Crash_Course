const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common')


module.exports = class Friend {
    constructor(name, birthday, id = '', pastGifts = [], tags = [], possibleGifts = []) {
        this.name = name
        this.birthday = birthday
        this.id = shortid.generate()
        this.pastGifts = []
        this.tags = []
        this.possibleGifts = []
        // DON'T NEED THIS
        //Database.saveObject(this)
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

    static create({ name, birthday, id, pastGifts, tags, possibleGifts }) {
        return new Friend(name, birthday, id, pastGifts, tags, possibleGifts)
    }
}