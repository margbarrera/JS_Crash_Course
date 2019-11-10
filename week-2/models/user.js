const shortid = require('shortid');
const Database = require('../database'); 
const common = require('../common');
const Calendar = require('./calendar');

const CalendarService = require('../services/calendar-service')
const GiftService = require('../services/gift-service')




module.exports = class User {
    constructor(name, birthday, id = undefined, socialCircle = [], unassignedGiftIdeas = [], assignedGiftIdea = {}, calendar = {}, pastGifts = []) {
        this.name = name
        this.birthday = birthday
        this.id = id
        this.socialCircle = socialCircle
        this.unassignedGiftIdeas = unassignedGiftIdeas
        this.assignedGiftIdeas = {} /*this will contain pairs in the form friend.id : gift.id */
        this.calendar = calendar
        this.pastGifts = pastGifts
    }
   
    async createCalendar() {
        const userCal = new Calendar(this.id);
        await CalendarService.add(userCal);
        this.calendar = userCal
    }


    addFriend(friend) {
        this.socialCircle.push(friend.id);
        this.calendar.addEntry(friend.name+'(birthday)',friend.birthday)
        return friend
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
                let alternativeGift = await GiftService.find(suggestion);
                common.print(`Why don't you buy him a ${ alternativeGift.name} instead?`)
            }
        }

    }

    static create({ name, birthday, id, socialCircle, unassignedGiftIdeas, assignedGiftIdea, calendar, pastGifts }) {
        return new User(name, birthday, id, socialCircle, unassignedGiftIdeas, assignedGiftIdea, calendar, pastGifts )
    }

}