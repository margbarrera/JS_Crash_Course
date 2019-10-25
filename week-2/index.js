
//////////////// SANTA LITTLE HELPER ///////////////////

//////////////// CLASSES:
// USERS are the main users of the app, obviously. They can do a bunch of stuff but more on that later.
// They will have a login and psw (but I don't know how to do that yet). They also have a name!
// GIFTS are possible gits ideas, they have a name, a price, and a URL where they can be bought.
// They can also be assigned a tag according to what kind of gift they are (ex. food, ironic, useful)
// FRIENDS are the people the users want to buy presents for. They have names, birthdays and
// they can be assigned tags to keep track of their preferences and taste.


//////////////// INTERACTIONS:
// Users can save gift ideas they like even if they don't know who to give them to yet.
// They can assign a gift idea to somebody, waiting for the perfect occasion.
// They can also actually buy the gift for a friend, they will be provided with the URL.
// A user can always keep track of what items he bought in the past for somebody, if she attempts
// to buy someone a gift that was already given them in the past she will be notified and,
// if present, an alternative will be suggested. Users can also filter through their gift ideas
// by budget or by tags. A user can also check the calendar to see if some birthday is arriving soon!
// Eventually in the future it would be cool to be able to assign gift ideas to specific occasions
// that are properties of the friends (ex.: friend.birthday, friend.christmas, friend.wedding).





const User = require('./user');
const Gift = require('./gift');
const Friend = require('./friend');


/// INSTANCES

const marghi = new User('Marghi');

const sofia = new Friend('Sofia', '10.12')
const mario = new Friend('Mario', '03.09')
const gino = new Friend('Gino', '10.23')
const pina = new Friend('Pina', '01.01')

const book = new Gift('JavaScript for Dummies', 47.54, 'https://www.amazon.com/JavaScript-Dummies-Emily-Vander-Veer/dp/0764576593')
const shirt = new Gift('Schwarzes Mesh-T-Shirt', 17.99, 'https://www.asos.de/asos-design/asos-design-schwarzes-mesh-t-shirt/prd/11914421?r=1')
const bbq = new Gift('Kieler Kiste für 4 Personen', 295, 'https://www.bbq-laden.de/Kieler-Kiste-fuer-4-Personen')
const niceCard = new Gift('Geburtstagskarte Große Konfettis', 0.5, 'https://www.planet-cards.de/glueckwuensche-geburtstag-grosse-konfettis.html')

/// INTERACTIONS

marghi.addFriend(sofia);
marghi.addFriend(mario);
marghi.addFriend(gino);
marghi.addFriend(pina);
console.log(marghi.friends);

marghi.assignGiftIdea(sofia, book);

marghi.checkCalendar();


marghi.saveGiftIdea(bbq);
marghi.saveGiftIdea(book);
marghi.saveGiftIdea(shirt);
marghi.saveGiftIdea(niceCard);
niceCard.assignTag('boring');
pina.assignTag('boring');

marghi.giftTheGift(gino, shirt);
marghi.giftTheGift(gino, book);
marghi.assignGiftIdea(gino, bbq);
marghi.giftTheGift(gino, shirt);


console.log(`You have just 30 euros, with that budget you could buy:`);
marghi.filterGiftsPerBudget(30).forEach(item => console.log(item.name));