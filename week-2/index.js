const User = require('./user');
const Gift = require('./gift');
const Friend = require('./friend');

// REMEMBER TO GATHER PEOPLE FRIENDS AND GIFTS INTO GLOBAL ARRAYS


/// INSTANCES
global.allTheObjects = [];
const marghi = new User('Marghi');

const sofia = new Friend('Sofia', '10.12')
const mario = new Friend('Mario', '03.09')
const gino = new Friend('Gino', '10.23')
const pina = new Friend('Pina', '01.01')

const book = new Gift('JavaScript for Dummies', 47.54, 'https://www.amazon.com/JavaScript-Dummies-Emily-Vander-Veer/dp/0764576593')
const shirt = new Gift('Schwarzes Mesh-T-Shirt', 17.99, 'https://www.asos.de/asos-design/asos-design-schwarzes-mesh-t-shirt/prd/11914421?r=1')
const bbq = new Gift('Kieler Kiste für 4 Personen', 295, 'https://www.bbq-laden.de/Kieler-Kiste-fuer-4-Personen')
const niceCard = new Gift('Geburtstagskarte Große Konfettis', 0.5, 'https://www.planet-cards.de/glueckwuensche-geburtstag-grosse-konfettis.html')
const handmadeCookies = new Gift('Chocolate cookies', 2);



/// INTERACTIONS

marghi.addFriend(sofia);
marghi.addFriend(mario);
marghi.addFriend(gino);
marghi.addFriend(pina);
console.log(marghi.id);

marghi.assignGiftIdea(sofia, book);

//marghi.checkCalendar();


marghi.saveGiftIdea(bbq);
marghi.saveGiftIdea(book);
marghi.saveGiftIdea(shirt);
marghi.saveGiftIdea(niceCard);
niceCard.assignTag('boring');
pina.assignTag('boring');

//marghi.giftTheGift(gino, shirt);
//marghi.giftTheGift(gino, book);
marghi.assignGiftIdea(gino, bbq);
console.log(allTheObjects)
marghi.giftTheGift(gino, shirt);
marghi.giftTheGift(mario, handmadeCookies);


console.log(`You have just 30 euros, with that budget you could buy:`);
marghi.filterGiftsPerBudget(30).forEach(item => console.log(item.name));