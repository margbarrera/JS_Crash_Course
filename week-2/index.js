const User = require('./models/user');
const Gift = require('./models/gift');
const Friend = require('./models/friend');
//const Database = require('./database'); 
const Event = require('./models/event');
// const Calendar = require('./models/calendar'); // THIS IS PROBABLY NOT NEEDED
const common = require('./common')

const UserService = require('./services/user-service');
const GiftService = require('./services/gift-service');
const FriendService = require('./services/friend-service');
const EventService = require('./services/event-service');
const CalendarService = require('./services/calendar-service');


async function main() {
    /// INSTANCES
    const marg = new User('marg');
    const jan = new User('Jan');

    const sofia = new Friend('Sofia', '10.12')
    const mario = new Friend('Mario', '03.09')
    const gino = new Friend('Gino', '10.23')
    const pina = new Friend('Pina', '01.01')

    const book = new Gift('JavaScript for Dummies', 47.54, 'https://www.amazon.com/JavaScript-Dummies-Emily-Vander-Veer/dp/0764576593')
    const shirt = new Gift('Schwarzes Mesh-T-Shirt', 17.99, 'https://www.asos.de/asos-design/asos-design-schwarzes-mesh-t-shirt/prd/11914421?r=1')
    const bbq = new Gift('Kieler Kiste für 4 Personen', 295, 'https://www.bbq-laden.de/Kieler-Kiste-fuer-4-Personen')
    const niceCard = new Gift('Geburtstagskarte Große Konfettis', 0.5, 'https://www.planet-cards.de/glueckwuensche-geburtstag-grosse-konfettis.html')
    const handmadeCookies = new Gift('Chocolate cookies', 2);

    const graduation = new Event('Jan\'s Graduation', jan, '03.06' );
    const wedding = new Event('Tom and Sonja Wedding', 'Tom', '12.28' );

    // ADDING TO DATABASE

    await UserService.add(marg);
    await UserService.add(jan);
    await FriendService.add(sofia);
    await FriendService.add(mario);
    await FriendService.add(gino);
    await FriendService.add(pina);
    await GiftService.add(book);
    await GiftService.add(shirt);
    await GiftService.add(bbq);
    await GiftService.add(niceCard);
    await GiftService.add(handmadeCookies);
    await EventService.add(graduation);
    await EventService.add(wedding);

    /// INTERACTIONS

    book.assignTag('useful');
    shirt.assignTag('clothes');
    bbq.assignTag('expensive');
    bbq.assignTag('food');
    niceCard.assignTag('boring');
    niceCard.assignTag('cheap');
    handmadeCookies.assignTag('food');
    handmadeCookies.assignTag('cheap');
    handmadeCookies.assignTag('handmade');

    marg.addFriend(sofia);
    marg.addFriend(mario);
    marg.addFriend(gino);
    marg.addFriend(pina);
    jan.addFriend(sofia);
    jan.addFriend(mario);


    marg.assignGiftIdea(sofia, book);
    marg.assignGiftIdea(gino, bbq);
    marg.assignGiftIdea(pina, shirt);
    marg.assignGiftIdea(pina, bbq);
    marg.assignGiftIdea(pina, book);
    marg.assignGiftIdea(pina, handmadeCookies);

    marg.saveGiftIdea(bbq);
    marg.saveGiftIdea(book);
    marg.saveGiftIdea(shirt);
    marg.saveGiftIdea(niceCard);
    marg.saveGiftIdea(handmadeCookies);

    pina.assignTag('boring');
    pina.assignTag('food');

    marg.giftTheGift(gino, shirt);
    marg.giftTheGift(gino, book);
    marg.giftTheGift(gino, shirt);
    marg.giftTheGift(mario, handmadeCookies);

    graduation.inviteGuest(marg);
    wedding.inviteGuest(marg);
    graduation.addGiftToEvent(marg, shirt);
    graduation.readGuestList();
    graduation.readGiftList();
    graduation.addGiftToEvent(jan, bbq);
    graduation.inviteGuest(jan);
    graduation.addGiftToEvent(marg, bbq);
    graduation.addGiftToEvent(marg, shirt);

//    marg.calendar.addEntry('christmas','12.24');
//    marg.calendar.addEntry('orthodoxChristmas','01.07');
//    marg.calendar.getUpcomingEvent();
}

main();

/// SAVING AND LOADING DATA AS A JSON FILE

/*Database.saveJson('Database.json', Database.data);
const newlyLoadedData = Database.loadJson('Database.json');*/

// OTHER STUFF THAT DOESN'T WORK ANYMORE:

// common.print('logging the result of by price search:')
// Database.filterGiftsPerBudget(marg,30);
// common.print('logging the result of by tag search:')
// Database.filterGiftsByTag(marg,'useful');

// console.log(marg.calendar.entries);








