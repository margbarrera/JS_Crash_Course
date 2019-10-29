const fs = require('fs')

module.exports =  Database = {

    saveObject(obj) {
        this[obj.id]= obj
    },

    saveJson(filename, data) {
        fs.writeFileSync(filename, JSON.stringify(data))
    },

    loadJson (filename) {
        return JSON.parse(fs.readFileSync(filename, 'utf8')) 
      },

    filterGiftsPerBudget(user, maxBudget) {
        if (!isNaN(maxBudget)) {
            // I find all the objects in the Database that both share an ID
            // with this.unassignGiftIdeas && have a price that is smaller or equal to maxBudget. 
            // I print their name to the console (optional) and I return an array with their IDs.
             const withinBudgetIdeas = user.unassignedGiftIdeas.filter(gift => Database[gift].price <= maxBudget);
             withinBudgetIdeas.forEach(x => console.log(Database[x].name))
             return withinBudgetIdeas;

        } else {
            console.log('Currently only prices in euros are accepted. Please insert your budget as a number, without any currency. E.g. 30')
        }
    },

    filterGiftsByTag(user, tag) {
        // same as above I guess.
        const taggedIdeas = user.unassignedGiftIdeas.filter(gift => Database[gift].tags.includes(tag));
        if(taggedIdeas.length > 0) {
            console.log(`Items tagged as ${tag}:`)
        taggedIdeas.forEach(x => console.log(Database[x].name))
          } else { console.log(`You have saved no items with a tag of ${tag}.` )}
        return taggedIdeas;
    }


}


