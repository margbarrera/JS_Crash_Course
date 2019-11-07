const User = require('./models/user');
const Gift = require('./models/gift');
const Friend = require('./models/friend');
const Event = require('./models/event');
const common = require('./common')

const UserService = require('./services/user-service');
const GiftService = require('./services/gift-service');
const FriendService = require('./services/friend-service');
const EventService = require('./services/event-service');
const CalendarService = require('./services/calendar-service');

common.clearDB()

async function main() {
 
    //  CREATING THE INSTANCES
    // ADDING THEM TO DATABASE
    // AND REASSIGNING THEM FOR BETTER READABILITY

    const marg = await UserService.add(new User('Marg'));
    const jan = await UserService.add(new User('Jan'));
    const sofia = await FriendService.add(new Friend('Sofia', '10.12'));
    const mario = await FriendService.add(new Friend('Mario', '03.09'));
    const gino = await FriendService.add(new Friend('Gino', '10.23'));
    const pina = await FriendService.add(new Friend('Pina', '01.01'));
    const book = await GiftService.add(new Gift('JavaScript for Dummies', 47.54, 'https://www.amazon.com/JavaScript-Dummies-Emily-Vander-Veer/dp/0764576593'));
    const shirt = await GiftService.add(new Gift('Schwarzes Mesh-T-Shirt', 17.99, 'https://www.asos.de/asos-design/asos-design-schwarzes-mesh-t-shirt/prd/11914421?r=1'));
    const bbq = await GiftService.add(new Gift('Kieler Kiste für 4 Personen', 295, 'https://www.bbq-laden.de/Kieler-Kiste-fuer-4-Personen'));
    const niceCard = await GiftService.add(new Gift('Geburtstagskarte Große Konfettis', 0.5, 'https://www.planet-cards.de/glueckwuensche-geburtstag-grosse-konfettis.html'));
    const handmadeCookies = await GiftService.add(new Gift('Chocolate cookies', 2));
    const graduation = await EventService.add(new Event('Jan\'s Graduation', jan, '03.06' ));
    const wedding = await EventService.add(new Event('Tom and Sonja Wedding', 'Tom', '12.28' ));
    const party = await EventService.add(new Event('Some Party', 'Bob', '11.22'));

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
    
    console.log(bbq.tags);
    
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
    console.log(pina.getTags());

    await marg.giftTheGift(gino, shirt);
    await marg.giftTheGift(gino, book);
    await marg.giftTheGift(gino, shirt);
    marg.giftTheGift(mario, handmadeCookies);

    graduation.inviteGuest(marg);
    wedding.inviteGuest(marg);
    graduation.addGiftToEvent(marg, shirt);
    await graduation.getGuestList();
    await graduation.getGiftList();
    graduation.addGiftToEvent(jan, bbq);
    graduation.inviteGuest(jan);
    graduation.addGiftToEvent(marg, bbq);
    graduation.addGiftToEvent(marg, shirt);
    party.inviteGuest(marg);

    marg.calendar.addEntry('christmas','12.24');
    marg.calendar.addEntry('orthodoxChristmas','01.07');
    marg.calendar.getUpcomingEvent();


}

main();


// OTHER STUFF THAT DOESN'T WORK ANYMORE:
// Should add back some filtering functions,
// i.e. by price and by tag
// to friends and gifts services










