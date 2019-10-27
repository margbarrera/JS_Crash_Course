const shortid = require('shortid');


module.exports = class Friend {
    constructor(name, birthday) {
        this.name = name
        this.birthday = birthday
        this.id = shortid.generate()
        this.pastGifts = []
        this.tags = []
        this.possibleGifts = []
        allTheObjects[this.id] = this
    }

    getPossibleGifts(num) {
        const possibleGiftObjects = []
        for (let i=0; i < num; i++) {
             possibleGiftObjects.push(allTheObjects[this.possibleGifts[i]]);
         }
         return possibleGiftObjects;
    }

    assignTag(tag) {
        this.tags.push(tag)
    }

}