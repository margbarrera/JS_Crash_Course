const express = require('express')
const router = express.Router()

const EventService = require('../services/event-service');


///////////////////////// EVENTS /////////////////////////


// ALL EVENTS' LIST

router.get('/all', async (req, res) => {
    const allEvents = await EventService.findAll()
    res.render('events', { allEvents: allEvents})
})

// FETCH EVENT BY ID

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fetchedEvent = await EventService.find(id)
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


// INVITING GUESTS TO EVENT

router.post('/event/:id', async (req, res) => {
    const thisEvent = await EventService.find(req.params.id)
    const userToInvite = await UserService.find(req.body.id) 
    await thisEvent.inviteGuest(userToInvite)
 //   await EventService.saveAndReplace(thisEvent)
 //   await UserService.saveAndReplace(userToInvite)
 
    res.send(thisEvent)
})

module.exports = router
