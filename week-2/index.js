const User = require('./user');
const Gift = require('./gift');
const Friend = require('./friend');
const Database = require('./database'); 
const Event = require('./event');
const Wishlist = require('./wishlist');
const common = require('./common')


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

/// SAVING AND LOADING DATA AS A JSON FILE

/*Database.saveJson('Database.json', Database.data);
const newlyLoadedData = Database.loadJson('Database.json');*/

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

common.print('logging the result of by price search:')
Database.filterGiftsPerBudget(marg,30);
common.print('logging the result of by tag search:')
Database.filterGiftsByTag(marg,'useful');


const graduation = new Event('Jan\'s Graduation', jan, '03.06' );
const wedding = new Event('Tom and Sonja Wedding', 'Tom', '12.28' );
graduation.inviteGuest(marg);
wedding.inviteGuest(marg);
graduation.addGiftToEvent(marg, shirt);
graduation.readGuestList();
graduation.readGiftList();
graduation.addGiftToEvent(jan, bbq);
graduation.inviteGuest(jan);
graduation.addGiftToEvent(marg, bbq);
graduation.addGiftToEvent(marg, shirt);



marg.addFriend(sofia);
marg.addFriend(mario);
marg.addFriend(gino);
marg.addFriend(pina);
jan.addFriend(sofia);
jan.addFriend(mario);

marg.calendar.addEntry('christmas','12.24');
marg.calendar.addEntry('orthodoxChristmas','01.07');
console.log(marg.calendar.entries);
marg.calendar.getUpcomingEvent();

