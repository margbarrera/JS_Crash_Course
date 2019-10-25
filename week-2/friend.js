const shortid = require('shortid');

module.exports = class Friend {
    constructor(name, birthday) {
        this.name = name
        this.birthday = birthday
        this.id = shortid.generate()
        this.pastGifts = []
        this.tags = []
        this.possibleGifts = []
    }

    assignTag(tag) {
        this.tags.push(tag)
    }

}