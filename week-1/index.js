//////////////////////////////////////////////////////////////////
// This is the beginning of an app to let people wash their clothes
// and smell amazing afterwards. Humans can wear their clothes, make
// them dirty, put them in the laundry basket, check if it's full
// and eventually wash them all and take them back to their wardrobe
// when they're clean. Although Laundry is not the most exciting task,
// in my humble opinion clean clothes are sexy! 
//////////////////////////////////////////////////////////////////



//////// THE CLASSES ( CLOTHES, HUMANS, LAUNDRY BASKETS) /////////

class Cloth {
    constructor(ownerName) {
        this.ownerName = ownerName
        this.clean = true
       this.type = this.getRandomTypeOfCloth()
    }

   getRandomTypeOfCloth() {
        let randomNum = Math.floor(Math.random() * 3)
        if(randomNum == 0) { return 'whites'}
        else if (randomNum == 1) { return 'blacks' }
        else if (randomNum == 2 || randomNum == 3) { return 'delicates' }
    } 

    isSmelledBy(human) {
        if(this.clean) {
            console.log(`${human}: Sniff sniff...   This smells amazing! It's staying in the wardrobe!`)
        } else { console.log(`${human}: Sniff sniff... Well, this smells awful. It goes straight into the laundry basket, jesus christ!`)}
    }
}


class Human {
    constructor(name, numOfClothesOwned) {
        this.name = name
        this.numOfClothesOwned = 0
        this.wardrobe = []
        // populating the wardrobe with the number of actual clothes objects that
        //  was provided as an argument (i wrote the function below as a method)
            this.addClothes(numOfClothesOwned)
        
    }



    putClothesInBasket(cloth) { 
        // whenever cloths are 'put in basket' they go to the appropriate one,
        // according to their type, if and only if it is not full (duh), then
        // they are taken out of the wardrobe of the owner.

        if (cloth.type == 'whites') { 
            if(whitesBasket.isFull()) {
                console.log('This basket seems full, you will have to wash the stuff eventually')
            } else {
                whitesBasket.items.push(cloth);
                this.wardrobe.splice(0,1);
            }
        }
        else if (cloth.type == 'blacks') { 
            if(blacksBasket.isFull()) {
                console.log('This basket seems full, you will have to wash the stuff eventually')
            } else {
                blacksBasket.items.push(cloth);
                this.wardrobe.splice(0,1);
            }
        }
        else   { 
            if(delicatesBasket.isFull()) {
                console.log('This basket seems full, you will have to wash the stuff eventually')
            } else {
                delicatesBasket.items.push(cloth);
                this.wardrobe.splice(0,1);
            }        }
        // then of course they are taken out of the wardrobe
    }

    checkBasket(basket) {
        if (basket.isFull()) {
            console.log(`${this.name}: Time to do laundry! let's empty the ${basket.type} basket!`)
        } else { console.log(`${this.name}: Still half empty, I can wait a few more days`)}
    }

    addClothes(num) {
        this.numOfClothesOwned = this.numOfClothesOwned + num;
        for(let i=0; i < num; i++) {
            this.wardrobe.push(new Cloth(this.name))
        }
    }

    wearCloth(cloth) {
        console.log(`${this.name}: I'm using the cloth and I\'m sweating like crazy`)
        cloth.clean = false;
    }
}

class LaundryBasket {
    constructor(type,maxCapacity) {
        this.type = type
        this.maxCapacity = maxCapacity
        this.items = []
    }

    isFull() {
        if(this.items.length == this.maxCapacity) {
            return true
        } else { return false}
    }

    washAndReturn() {
        // So, in theory this should make every item 'clean' again
        // and return every item to its owner. It is a little tricky though.
        console.log(`Starting the washing machine... There are ${this.items.length} clothes in total.`);
        this.items.forEach(cloth => {
            // clean it
            cloth.clean = true;

            // find out who owns the cloth
            function matchOwnerTagToPerson(person) {
                if(person.name == cloth.ownerName) {
                    return true
                }
            }
            let owner = houseMembers.filter(matchOwnerTagToPerson)[0]
            // And then push it back in their wardrobe
            owner.wardrobe.push(cloth);

        });
        this.items = [];
    }
}
//////// THE INSTANCES ARE CREATED: 3 humans, 1 basket, all of the clothes(10)/////////

const margherita = new Human('Margherita',3);
const pino = new Human('Pino',3);
const gina = new Human('Gina',4);
const houseMembers = [margherita, pino, gina];

const whitesBasket = new LaundryBasket('whites',5);
const blacksBasket = new LaundryBasket('blacks',5);
const delicatesBasket = new LaundryBasket('delicates',3)

//////// THE INTERACTIONS /////////

// Margherita wears an item of clothing, which makes it no longer clean 

 margherita.wearCloth(margherita.wardrobe[0]);


 // Margherita smells the item of clothing, finds it dirty  
 // and puts it in the laundy basket. Wise woman.

 margherita.wardrobe[0].isSmelledBy('Margherita');
 margherita.putClothesInBasket(margherita.wardrobe[0]);


// Gina wears something as well Than she smells all of her clothes,
// just to be sure, and decides which ones need to be washed.
// She then proceeds to put them in the basket.

console.log('');

gina.wearCloth(gina.wardrobe[0]);

let i=0
while ( i < gina.wardrobe.length) {
    let element = gina.wardrobe[i]
    element.isSmelledBy('Gina');
    if(element.clean) {
        i++
    } else { gina.putClothesInBasket(element) }
}

 // Pino wears ALL of his clothes. Mad style!
 // Afterwards they are all pretty smelly and they get put in the basket too.

 console.log('');

 while (pino.wardrobe.length > 0) {
     pino.wearCloth(pino.wardrobe[0]);
     pino.putClothesInBasket(pino.wardrobe[0])
 };


// some additional putting clothes in basket, for the sake of the example
// i have to make sure at least one basket gets full :D

gina.putClothesInBasket(gina.wardrobe[0]);
gina.putClothesInBasket(gina.wardrobe[1]);
gina.putClothesInBasket(gina.wardrobe[0]);
margherita.putClothesInBasket(margherita.wardrobe[1]);
margherita.putClothesInBasket(margherita.wardrobe[0]);



// The delicates basket seems full enough, Gina checks:

console.log('');

gina.checkBasket(delicatesBasket);

// Turns out her hunch was right: it is full, so she starts the washing machine:

console.log(`pino's wardrobe before the washing has ${pino.wardrobe.length} clean items`)

delicatesBasket.washAndReturn();

// Everybody's happy, their clothes are clean and they are successfully back
// in their owners' wardrobe. The laundry basket is empty again, and that
// is a wonderful sensation for a laundry basket. Order is restored!

console.log(`pino's wardrobe after the washing has ${pino.wardrobe.length} clean items`)
console.log(`there are ${delicatesBasket.items.length} dirty clothes in the delicates basket. Yay!`);

