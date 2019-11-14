const express = require('express')
const router = express.Router()

const UserService = require('../services/user-service');

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
    await UserService.saveAndReplace(newUser)
    res.send(newUser)
})

// DELETE USER

router.delete('/:id', async (req, res) => {
    await UserService.del(req.params.id)
    res.send('user successfully deleted')
})

/////////////////////////  INTERACTIONS  /////////////////////////

// ADDING FRIENDS TO USER

router.post('/:id/add-friend', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    // IF THE FRIEND TO BE ADDED EXISTS AND IT'S A USER
    const friendToAdd = await UserService.find(req.body.friend) 
    await UserService.addFriend(thisUser, friendToAdd)
    res.send(thisUser)
})

// REMOVING A FRIEND FROM USER'S SOCIAL CIRCLE

router.post('/:id/unfriend', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    // IF THE FRIEND TO BE REMOVED IS A USER
    await UserService.unfriend(thisUser,req.body.friend)
    res.send(thisUser)
})

// SAVING A GIFT IDEA

router.post('/:id/save-gift-idea', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    // IF THE GIFT EXISTS
    const gift = await GiftService.find(req.body.id)
    await thisUser.saveGiftIdea(gift)
    res.send(thisUser)
    })

// DISCARDING A GIFT IDEA

router.post('/:id/discard-gift-idea', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    await thisUser.discardGiftIdea(req.body.id)
    res.send(thisUser)
})

module.exports = router
