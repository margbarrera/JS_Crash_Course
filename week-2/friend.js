const shortid = require('shortid');

const allTheFriends = [];

module.exports = class Friend {
    constructor(name, birthday) {
        this.name = name
        this.birthday = birthday
        this.id = shortid.generate()
        this.pastGifts = []
        this.tags = []
        this.possibleGifts = []
        allTheObjects.push(this)
    }

    assignTag(tag) {
        this.tags.push(tag)
    }

}