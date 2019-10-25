
module.exports = class User {
    constructor(name) {
        name = this.name
        this.friends = []
        this.unassignedGiftIdeas = []
    }

    addFriend(friend) {
        this.friends.push(friend)
    };

    saveGiftIdea(gift) {
        this.unassignedGiftIdeas.push(gift)
    };

    checkCalendar() {
        // I need to put in real dates, as for now I'm inputting manually what day it is today
        this.friends.forEach(friend => {
            let today = '10.24'
            let d = friend.birthday - today
            if (d < 0) {
                d = d + 12.00
            }
            friend.d = d
        })

        let upcomingBirthdaysArray = this.friends.sort(function(a, b) {
            return a.d - b.d
        });
        let upcomingBirthday = upcomingBirthdaysArray[0];
        console.log(`It's ${upcomingBirthday.name}'s birthday soon.`);
        if (upcomingBirthday.upcomingGifts.length != 0) {
            console.log(`Buy them something, maybe ${upcomingBirthday.upcomingGifts[0].name}.`)
        } else {
            console.log(`Buy them something, maybe browse your gift ideas. `)
        }
        return upcomingBirthday
    }

    assignGiftIdea(friend, gift) {
        friend.upcomingGifts.push(gift)
    };

    giftTheGift(friend, gift) {
        if (!friend.pastGifts.includes(gift)) {
            console.log(`You are buying ${friend.name} a ${gift.name}. Go over to ${gift.url} to buy it. You are a very nice person.`)
            friend.pastGifts.push(gift);
            gift.giftedToArchive.push(friend);
        } else {
            console.log(`You already gifted ${friend.name} this item! NOT CUTE.`)
            if (friend.upcomingGifts.length > 0) {
                console.log(`Why don't you buy him a ${friend.upcomingGifts[0].name} instead?`)
            }
        }

    }

    filterGiftsPerBudget(maxBudget) {
        if (!isNaN(maxBudget)) {
            return this.unassignedGiftIdeas.filter(gift => gift.price <= maxBudget);
        } else {
            console.log('Currently only prices in euros are accepted. Please insert your budget as a number, without any currency. I.e. 30')
        }
    }

    filterGiftsByTag(tag) {
        return this.unassignedGiftIdeas.filter(gift => gift.tag <= tag)
    }

}