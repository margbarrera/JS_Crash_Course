const shortid = require('shortid');



module.exports = class User {
    constructor(name) {
        this.name = name
        this.id = shortid.generate()
        this.socialCircle = []
        this.unassignedGiftIdeas = []
        allTheObjects.push(this)
    }

    addFriend(friend) {
        this.socialCircle.push(friend.id)
    };

    saveGiftIdea(gift) {
        this.unassignedGiftIdeas.push(gift.id)
    };

    checkCalendar() {
        // I need to put in real dates, as for now I'm inputting manually what day it is today
        // I ALSO NEED TO IMPLEMENT THE IDS OTHERWISE IT'S BROKEN! :O it's complicated
        this.socialCircle.forEach(friend => {
            let today = '10.24'
            let d = friend.birthday - today
            if (d < 0) {
                d = d + 12.00
            }
            friend.d = d
        })

        let upcomingBirthdaysArray = this.socialCircle.sort(function(a, b) {
            return a.d - b.d
        });
        let upcomingBirthday = upcomingBirthdaysArray[0];
        console.log(`It's ${upcomingBirthday.name}'s birthday soon.`);
        if (upcomingBirthday.possibleGifts.length != 0) {
            console.log(`Buy them something, maybe ${upcomingBirthday.possibleGifts[0].name}.`)
        } else {
            console.log(`Buy them something, maybe browse your gift ideas. `)
        }
        return upcomingBirthday
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
                // this should loop through all the gifts, find the one that has an ID of possibleGifts[0].id,
                // and return the name of that one. but how do i loop through all the gifts?
                
                console.log(`Why don't you buy him a ${allTheObjects.find(x => x.id == friend.possibleGifts[0].id).name} instead?`)
            }
        }

    }

    filterGiftsPerBudget(maxBudget) {
        if (!isNaN(maxBudget)) {
            return this.unassignedGiftIdeas.filter(gift => gift.price <= maxBudget);
        } else {
            console.log('Currently only prices in euros are accepted. Please insert your budget as a number, without any currency. E.g. 30')
        }
    }

    filterGiftsByTag(tag) {
        return this.unassignedGiftIdeas.filter(gift => gift.tag == tag)
    }

}