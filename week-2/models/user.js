const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common');
const Calendar = require('./calendar');

const CalendarService = require('../services/calendar-service')
const GiftService = require('../services/gift-service')




module.exports = class User {
    constructor(name, id = '', socialCircle = [], unassignedGiftIdeas = [], assignGiftIdea = {}, calendar = '') {
        this.name = name
        this.id = shortid.generate()
        this.socialCircle = []
        this.unassignedGiftIdeas = []
        this.assignedGiftIdeas = {}/*this will contain pairs in the form friend.id : gift.id */
        // DON'T NEED THIS
        //Database.saveObject(this)
        const userCal = new Calendar(this.id);
        // NEED TO CHANGE THIS ONE BELOW AS WELL: I DON'T KNOW HOW
        // Database.saveObject(userCal);
        CalendarService.add(userCal);
        this.calendar = CalendarService.find(userCal.id)
        // this.calendar = Database.getData(userCal.id)
    }
    // I'M GUESSING THIS DOESN'T APPLY AT ALL ANYMORE
    /*calendar() {

        //this.calendar = userCal.id;
        return ;
    }*/

    addFriend(friend) {
        this.socialCircle.push(friend.id);
                /// NEED TO CHANGE THIS ONE BELOW AS WELL: I DON'T KNOW HOW

        this.calendar.addEntry(friend.name+'(birthday)',friend.birthday)
    };

    saveGiftIdea(gift) {
        if( this.unassignedGiftIdeas.includes(gift.id) ) {
            common.print('You already saved this idea.')
        } else { this.unassignedGiftIdeas.push(gift.id) }   
    };

    assignGiftIdea(friend, gift) {
        this.assignedGiftIdeas[friend.id] = gift.id
        //friend.possibleGifts.push(gift.id)
    };

    getAssignedGift(friend) {
        return this.assignedGiftIdeas[friend.id];
    }

    giftTheGift(friend, gift) {
        if (!friend.pastGifts.includes(gift.id)) {
            if(gift.url == 'no-url') {
                common.print(`You are gifting ${friend.name} ${gift.name}.`)
            } else {
                common.print(`You are buying ${friend.name} ${gift.name}. To buy it go over to: ${gift.url}`)
        }
            friend.pastGifts.push(gift.id);
        } else {
            common.print(`You already gifted ${friend.name} this item! NOT CUTE.`)
            if (this.getAssignedGift(friend) != undefined) {
                const suggestion = this.getAssignedGift(friend);
            // THIS NEEDS TO CHANGE
                common.print(`Why don't you buy him a ${GiftService.find(suggestion).name} instead?`)
            }
        }

    }

    static create({ name, id, socialCircle, unassignedGiftIdeas, assignGiftIdea, calendar }) {
        return new User(name, id, socialCircle, unassignedGiftIdeas, assignGiftIdea, calendar )
    }

}