const express = require('express')
const router = express.Router()

const UserService = require('../services/user-service');
const GiftService = require('../services/gift-service');

///////////////////////// USERS /////////////////////////

// ALL USERS' LIST

router.get('/all', async (req, res) => {
    const allUsers = await UserService.findAll()
    //const allCalendars = await CalendarService.findAll()
    res.render('users', { allUsers: allUsers})
})

// FETCH USER BY ID

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fetchedUser = await UserService.find(id)
    res.render('userProfile', {fetchedUser: fetchedUser})
})

// CREATE USER

router.post('/', async (req, res) => {
    const user = await UserService.add(req.body)
    const newUser = await UserService.find(user.id)
    //await newUser.createCalendar()
    res.send(newUser)
})

// DELETE USER

router.delete('/:id', async (req, res) => {
    await UserService.del(req.params.id)
    res.send('user successfully deleted')
})

/////////////////////////  INTERACTIONS  /////////////////////////

// ADDING FRIENDS TO USER

router.post('/:id/friends', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    const friendToAdd = await UserService.find(req.body.friend) 
    await UserService.addFriend(thisUser, friendToAdd)
    res.send(thisUser)
})

// REMOVING A FRIEND FROM USER'S SOCIAL CIRCLE

router.delete('/:id/friends/:friendid', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    await UserService.unfriend(thisUser,req.params.friendid)
    res.send(thisUser)
})

// SAVING A GIFT IDEA

router.post('/:id/gifts', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    const gift = await GiftService.find(req.body.gift)
    await UserService.saveGiftIdea(thisUser,gift)
    res.send(thisUser)
    })

// DISCARDING A GIFT IDEA

router.delete('/:id/gifts/:giftid', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    const gift = await GiftService.find(req.params.giftid)
    await UserService.discardGiftIdea(thisUser, gift)
    res.send(thisUser)
})

module.exports = router
