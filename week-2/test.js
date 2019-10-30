const User = require('./user');
const Gift = require('./gift');
const Friend = require('./friend');
const Database = require('./database'); 
const Event = require('./event');
const chalk = require('chalk');
const common = require('./common')
const Calendar = require('./calendar');



// TEST TO ENSURE EVERYTHING RUNS SMOOTHLY
// Turns out this is very difficult to do, so I'm doing it little by little.
// This is by no means complete, so it doesn't do its (ambitious) job really, but it still helped a lot.
// It made it easier to find where I broke something as I was rewriting most of my classes and functions.
// It's also a lot easier to use for this purpose than my previours index.js, so all in all I'm happy :)

// CREATE SOME INSTANCES TO TEST EVERYTHING

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
const silverFrame = new Gift('Silver frame',100);

const party = new Event('Lina\'s party', 'Lina', '04.04')

const test = {
   

    testUser() {

        console.log(chalk.green('Testing the User class...'));

        marg.addFriend(sofia);
        if (marg.socialCircle.includes(sofia.id)) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the addFriend function.'))};
       
        marg.saveGiftIdea(book);
        if (marg.unassignedGiftIdeas.includes(book.id)) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the saveGiftIdea function.'))};
       
        marg.assignGiftIdea(sofia, book);
        if (marg.assignedGiftIdeas[sofia.id] == book.id) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the assignGiftIdea function.'))};

        marg.giftTheGift(sofia, book);
        if (sofia.pastGifts.includes(book.id)) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the giftTheGift function.'))};

       // TEST MULTIPLE CALLS TO GIFT THE GIFT
       marg.giftTheGift(sofia, shirt);
       if (sofia.pastGifts.length > 1) {
        console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the giftTheGift function: when called two times the second item is not added')) };

        // TEST DUPLICATE GIFT ATTEMPTS
        marg.giftTheGift(sofia, book);
        if (sofia.pastGifts.length < 3) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the giftTheGift function: it doesn\'t reject duplicates!')) };

    },
    
    testEvent() {
            console.log(chalk.green('Testing the Event class...'));
        // TEST ADDING GIFTS TO EVENT (invited and non-invited)
        party.addGiftToEvent(marg, book);
        if(!party.giftList.includes(book.id)) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the addGiftToEvent function. It accepted a gift from a non-invited guest.'))}
        party.inviteGuest(marg);
        party.addGiftToEvent(marg, book);
        if(party.giftList.includes(book.id)) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the addGiftToEvent function. It didn\'t accept a gift from an invited guest.'))}

    },
            
    testDatabase() {
        console.log(chalk.green('Testing the Database...'));

        marg.saveGiftIdea(book);
        marg.saveGiftIdea(shirt);

        const max20MargIdeas = Database.filterGiftsPerBudget(marg,20)
        if( Database.getData(max20MargIdeas).name == 'Schwarzes Mesh-T-Shirt' ) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the filterPerBudget function'))}

        const nonNumericBudgetFilterAttemp = Database.filterGiftsPerBudget(marg,'string');
        if( nonNumericBudgetFilterAttemp ) {
            console.log(chalk.red('Something went wrong with the filterPerBudget function: it accepts non numeric values'))
        } else { console.log(chalk.green('Alles gut.'))
    }

        book.assignTag('useful');
        shirt.assignTag('clothes');

        const tagUsefulMargIdeas = Database.filterGiftsByTag(marg, 'useful');
        if( Database.getData(tagUsefulMargIdeas).name == 'JavaScript for Dummies' ) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the filterPerTag function')) }

    },

    testFriend() {
        console.log(chalk.green('Testing the Friend class...'));

        sofia.assignTag('foodie');
        sofia.assignTag('weird');
        if(sofia.getTags().includes('foodie')) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the assignTag to friend function')) }
        sofia.removeTag('foodie');
        if(!sofia.getTags().includes('foodie')) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the removeTag to friend function')) }
        
    },

    testGift() {
        console.log(chalk.green('Testing the Gift class...'));

        silverFrame.assignTag('useless');
        silverFrame.assignTag('pretty');
        if(silverFrame.getTags().includes('useless')) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the assignTag to gift function')) };
        silverFrame.removeTag('useless');
        if(!silverFrame.getTags().includes('useless')) {
            console.log(chalk.green('Alles gut.'))
        } else { console.log(chalk.red('Something went wrong with the removeTag to gift function')) }
    }

}
common.dontPrint();
test.testUser();
test.testEvent();
test.testDatabase();
test.testFriend();
test.testGift();




