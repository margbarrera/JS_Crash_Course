const express = require('express')
const router = express.Router()

const EventService = require('../services/event-service')
const UserService = require('../services/user-service')
const GiftService = require('../services/gift-service')


///////////////////////// EVENTS /////////////////////////

// ALL EVENTS' LIST

router.get('/all', async (req, res) => {
    const allEvents = await EventService.findAll()
    res.render('events', { allEvents: allEvents})
})

// FETCH EVENT BY ID

router.get('/:id', async (req, res) => {
    const id = req.params.id
    //const fetchedEvent = await EventService.find(id)
    //const fetchedEvent = await EventService.model.findById(id).populate({ path: 'giftList.gift', model: 'Gift' })
    const fetchedEvent = await EventService.model.findById(id).populate([{
                path: 'giftList.gift',
                model: 'Gift'
            }, {
                path: 'giftList.submittedby',
                model: 'User'
            }])
    res.render('eventProfile',{ fetchedEvent: fetchedEvent})
})

// CREATE EVENT

router.post('/', async (req, res) => {
    const newEvent = await EventService.add(req.body)
    res.send(newEvent)
})

// DELETE EVENT

router.delete('/:id', async (req, res) => {
    await EventService.del(req.params.id)
    res.send('event successfully deleted')
})

/////////////////////////  INTERACTIONS  /////////////////////////


// INVITING GUEST TO EVENT

router.post('/:id/guests', async (req, res) => {
    const thisEvent = await EventService.find(req.params.id)
    const userToInvite = await UserService.find(req.body.guest) 
    await EventService.inviteGuest(thisEvent,userToInvite) 
    res.send(thisEvent)
})

// DIS-INVITING GUEST TO EVENT (I mean, sometimes they deserve it)

router.delete('/:id/guests/:guestid', async (req, res) => {
    const thisEvent = await EventService.find(req.params.id)
    const userToRemove = await UserService.find(req.params.guestid) 
    await EventService.removeGuest(thisEvent,userToRemove) 
    res.send(thisEvent)
})

// ADD GIFT TO EVENT GIFTLIST

router.post('/:id/gifts', async (req, res) => {
    const thisEvent = await EventService.find(req.params.id)
    const user = await UserService.find(req.body.user)
    const gift = await GiftService.find(req.body.gift)
    await EventService.addGiftToEvent(thisEvent, user, gift) 
    res.send(gift)
})

// DELETE GIFT FROM EVENT GIFTLIST
// CURRENTLY DOESNT WORK


// router.delete('/:id/gifts/:giftid', async (req, res) => {
//     const thisEvent = await EventService.find(req.params.id)
//     const giftid = req.params.giftid
//     console.log(giftid)
//     const gift = await GiftService.find(giftid)
//     await EventService.removeGift(thisEvent, gift) 
//     res.send(gift)
// })



module.exports = router
