const shortid = require('shortid');
const Database = require('./database'); 
const common = require('./common');
const Calendar = require('./calendar');



module.exports = class User {
    constructor(name) {
        this.name = name
        this.id = shortid.generate()
        this.socialCircle = []
        this.unassignedGiftIdeas = []
        this.assignedGiftIdeas = {}/*this will contain pairs in the form friend.id:gift.id*/
        Database.saveObject(this)
        const userCal = new Calendar(this.id);
        Database.saveObject(userCal);
        this.calendar = Database.getData(userCal.id)
    }

    calendar() {

        //this.calendar = userCal.id;
        return ;
    }

    addFriend(friend) {
        this.socialCircle.push(friend.id);
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
            
                common.print(`Why don't you buy him a ${Database.getData(suggestion).name} instead?`)
            }
        }

    }
/*
    checkCalendar() {
        // TODO: if this returns undefined, it should log 'Nothing here' to the console.
                let minimumD = 1000;
                let upcomingEvent;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const currentDate = (today.getMonth()+1)+'.'+today.getDate()
        
                for(var property in this.calendar) {
                    let d = this.calendar[property] - currentDate
                    if (d < 0) {
                        d = d + 12.00
                    }
                    if (d < minimumD) { minimumD = d; upcomingEvent = `${property}, on ${this.calendar[property]}` }
                }
                if(upcomingEvent != undefined) {
                    common.print(`Next gift-giving occasion is ${upcomingEvent}. Hurry up!`)
                } else { common.print(`No upcoming events.`)}
        
                return upcomingEvent
            }
        
            addFestivityToCalendar(name, date) {
                this.calendar[name] = date
            }
*/

}