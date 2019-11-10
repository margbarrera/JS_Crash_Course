const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common')


module.exports = class Friend {
    constructor(name, birthday, id = '', pastGifts = [], tags = []) {
        this.name = name
        this.birthday = birthday
        this.id = id
        this.pastGifts = pastGifts
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

    getPastGifts() {
        return this.pastGifts
    }

    static create({ name, birthday, id, pastGifts, tags }) {
        return new Friend(name, birthday, id, pastGifts, tags)
    }
}