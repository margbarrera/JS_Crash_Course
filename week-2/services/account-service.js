const BaseService = require('./base-service')
const CalendarService = require('./calendar-service')
const UserService = require('./user-service')
const AccountModel = require('../models/account')
const CalendarModel = require('../models/calendar')

const Common = require('../common')


class AccountService extends BaseService {
    constructor() {
        super(AccountModel) 
    }
        // WAIT THIS DOESNT MAKE SENSE: I DONT WANT ANOTHER FRICKING MODEL, DO I?
        // I THINK I DO. THIS IS GETTING SO BIG. SIGH. SO:
        // NEW MODEL + NEW ROUTER + NEW VIEW. RIGHT?
        // BUT! let's say I have my user model, my calendar model, and my friend model.
        // Then my account model would just be a composite of all of those stuff (in ID form).
        // When I delete an account I delete all the associated stuff, and so on. My account model *is* now my user model.
        // Most stuff that is in the user service now should be here. AAaaaand we're back at the beginning.
        // But with one more layer of wtf-am-i-doing. I'm losing my mind.

        //Let's say I *don't* want a new model though. Or rather, it will be an empty one.

    async add(item) {
        const newUser = await UserService.add(item)
        const newUserCal = await CalendarService.add({creator: newUser._id})
        await UserService.addToProperty(newUser, 'calendar', newUserCal._id)
        return newUser
      }

    async getCalendar(user) {
        const cal = await CalendarService.find(user.calendar)
        return cal
    }

    async addToCalendar(user,event,date) {
        const cal = await this.getCalendar(user)
        await CalendarService.addEntry(cal,event,date)
    }

    async checkCalendar(user) {
        const cal = await this.getCalendar(user)
        const upcoming = await CalendarService.getUpcomingEvent(cal)
        return upcoming
    }

}
module.exports = new AccountService()
