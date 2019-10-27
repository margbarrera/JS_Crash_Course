const shortid = require('shortid');



module.exports = class User {
    constructor(name) {
        this.name = name
        this.id = shortid.generate()
        this.socialCircle = []
        this.unassignedGiftIdeas = []
        allTheObjects[this.id] = this
    }

    addFriend(friend) {
        this.socialCircle.push(friend.id)
    };

    saveGiftIdea(gift) {
        this.unassignedGiftIdeas.push(gift.id)
    };

    checkCalendar() {
        // I calculate which birthday is closest to today, not sure if it's overly complicated?
        let minimumD = 1000;
        let upcomingBirthdayId;
        this.socialCircle.forEach(friendId => {
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            let currentDate = (today.getMonth()+1)+'.'+today.getDate()
            let d = allTheObjects[friendId].birthday - currentDate
            if (d < 0) {
                d = d + 12.00
            }
            if (d < minimumD) {minimumD = d; upcomingBirthdayId = friendId}
        })

        let birthdayPerson = allTheObjects[upcomingBirthdayId]

        console.log(`It's ${birthdayPerson.name}'s birthday soon.`);
        if (birthdayPerson.possibleGifts.length != 0) {
            let firstPossibleGift = birthdayPerson.getPossibleGifts(1)[0];
            console.log(`Buy them something, maybe ${firstPossibleGift.name}.`)
        } else {
            console.log(`Buy them something, maybe browse your gift ideas. `)
        }

        return upcomingBirthdayId
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
                // here i fetch in allTheObjects the one whose ID i saved as a possible gift for my friend
                // and i return its name as an alternative suggestion
                const suggestion = friend.possibleGifts[0]
                console.log(`Why don't you buy him a ${allTheObjects[suggestion].name} instead?`)
            }
        }

    }

    filterGiftsPerBudget(maxBudget) {
        if (!isNaN(maxBudget)) {
            // I find all the objects in the allTheObjects array that both share an ID
            // with this.unassignGiftIdeas && have a price that is smaller or equal to maxBudget. 
            // I print their name to the console (optional) and I return an array with their IDs.
             const withinBudgetIdeas = this.unassignedGiftIdeas.filter(gift => allTheObjects[gift].price <= maxBudget);
             withinBudgetIdeas.forEach(x => console.log(allTheObjects[x].name))
             return withinBudgetIdeas;

        } else {
            console.log('Currently only prices in euros are accepted. Please insert your budget as a number, without any currency. E.g. 30')
        }
    }

    filterGiftsByTag(tag) {
        // same as above I guess.
        const taggedIdeas = this.unassignedGiftIdeas.filter(gift => allTheObjects[gift].tags.includes(tag));
        if(taggedIdeas.length > 0) {
            console.log(`Items tagged as ${tag}:`)
        taggedIdeas.forEach(x => console.log(allTheObjects[x].name))
          } else { console.log(`You have saved no items with a tag of ${tag}.` )}
        return taggedIdeas;
    }

}