const fs = require('fs')
const common = require('./common')

module.exports =  Database = {

    data : [],

    getData(id) {
        return this.data[id];
    },

    saveObject(obj) {
        this.data[obj.id]= obj
    },

    saveJson(filename, data) {
        fs.writeFileSync(filename, JSON.stringify(data))
    },

    loadJson (filename) {
        return JSON.parse(fs.readFileSync(filename, 'utf8')) 
      },


    filterGiftsPerBudget(user, maxBudget) {
        if (!isNaN(maxBudget)) {

             const withinBudgetIdeas = user.unassignedGiftIdeas.filter(gift => Database.getData(gift).price <= maxBudget);
             withinBudgetIdeas.forEach(x => common.print(Database.getData(x).name))
             return withinBudgetIdeas;

        } else {
            common.print('Currently only prices in euros are accepted. Please insert your budget as a number, without any currency. E.g. 30')
        }
    },

    filterGiftsByTag(user, tag) {
        const taggedIdeas = user.unassignedGiftIdeas.filter(gift => Database.getData(gift).tags.includes(tag));
        if(taggedIdeas.length > 0) {
            common.print(`Items tagged as ${tag}:`)
        taggedIdeas.forEach(x => common.print(Database.getData(x).name))
          } else { common.print(`You have saved no items with a tag of ${tag}.` )}
        return taggedIdeas;
    }


}


