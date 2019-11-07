const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common');
const Calendar = require('./calendar');

const CalendarService = require('../services/calendar-service')
const GiftService = require('../services/gift-service')




module.exports = class User {
    constructor(name, id = undefined, socialCircle = [], unassignedGiftIdeas = [], assignedGiftIdea = {}, calendar = '') {
        this.name = name
        this.id = id
        this.socialCircle = []
        this.unassignedGiftIdeas = []
        this.assignedGiftIdeas = {}/*this will contain pairs in the form friend.id : gift.id */
        const userCal = new Calendar(this.id);
        CalendarService.add(userCal);
        // 
        this.calendar = userCal//CalendarService.find(userCal.id)
        // this.calendar = Database.getData(userCal.id)
    }
   

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
    };

    getAssignedGift(friend) {
        return this.assignedGiftIdeas[friend.id];
    }

    async giftTheGift(friend, gift) {
        if (!friend.getPastGifts().includes(gift.id)) {
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
                let alternativeGift = await GiftService.find(suggestion);
                common.print(`Why don't you buy him a ${ alternativeGift.name} instead?`)
            }
        }

    }

    static create({ name, id, socialCircle, unassignedGiftIdeas, assignedGiftIdea, calendar }) {
        return new User(name, id, socialCircle, unassignedGiftIdeas, assignedGiftIdea, calendar )
    }

}