const shortid = require('shortid');
const Database = require('./database'); 



module.exports = class User {
    constructor(name) {
        this.name = name
        this.id = shortid.generate()
        this.socialCircle = []
        this.unassignedGiftIdeas = []
        Database.saveObject(this)
        this.calendar = []
    }

    addFriend(friend) {
        this.socialCircle.push(friend.id);
        this.calendar[friend.name+'(birthday)'] = friend.birthday
    };

    addFestivityToCalendar(name, date) {
        this.calendar[name] = date
    }

    saveGiftIdea(gift) {
        if( this.unassignedGiftIdeas.includes(gift.id) ) {
            console.log('You already saved this idea.')
        } else { this.unassignedGiftIdeas.push(gift.id) }   
    };

    checkCalendar() {

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
        console.log(`Next gift-giving occasion is ${upcomingEvent}. Hurry up!`)

        return upcomingEvent
    }

    assignGiftIdea(friend, gift) {
        friend.possibleGifts.push(gift.id)
    };

    giftTheGift(friend, gift) {
        if (!friend.pastGifts.includes(gift.id)) {
            if(gift.url == 'no-url') {
                console.log(`You are gifting ${friend.name} ${gift.name}.`)
            } else {
                console.log(`You are buying ${friend.name} ${gift.name}. To buy it go over to: ${gift.url}`)
        }
            friend.pastGifts.push(gift.id);
            gift.giftedToArchive.push(friend.id);
        } else {
            console.log(`You already gifted ${friend.name} this item! NOT CUTE.`)
            if (friend.possibleGifts.length > 0) {
                // here i fetch in the databse the one whose ID i saved as a possible gift for my friend
                // and i return its name as an alternative suggestion
                const suggestion = friend.possibleGifts[0]
                console.log(`Why don't you buy him a ${Database[suggestion].name} instead?`)
            }
        }

    }


    addGiftToEvent(event,gift) {
        if(event.guestList.includes(this.id)) {
            if(event.checkIfGiftIsPresent(gift)) { 
                console.log(`Somebody already bought this gift for this event.
Try to think of somenthig else, it will be much more appreciated.`)
            } else {  event.giftList.push(gift.id)  }
        } else { console.log(`You must be invited to the event to be able to partecipate`) }
    }

}