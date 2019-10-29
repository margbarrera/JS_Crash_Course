const shortid = require('shortid');
const Database = require('./database'); 


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

    getPossibleGifts(num) {
        const possibleGiftObjects = []
        for (let i=0; i < num; i++) {
             possibleGiftObjects.push(Database[this.possibleGifts[i]]);
         }
         return possibleGiftObjects;
    }

    assignTag(tag) {
        this.tags.push(tag)
    }

}