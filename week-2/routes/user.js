const express = require('express')
const router = express.Router()

const UserService = require('../services/user-service');
const GiftService = require('../services/gift-service');
const AccountService = require('../services/account-service');

///////////////////////// USERS /////////////////////////

// ALL USERS' LIST

router.get('/all', async (req, res) => {
    const allUsers = await UserService.findAll()
    res.render('users', { allUsers: allUsers})
})

// FETCH USER BY ID

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fetchedUser = await UserService.model.findById(id).populate([{
        path: 'assignedGiftIdeas.friend',
        model: 'User'
    }, {
        path: 'assignedGiftIdeas.gift',
        model: 'Gift'
    }])
    res.render('userProfile', {fetchedUser: fetchedUser})
})

// CREATE USER

router.post('/', async (req, res) => {
    
    const user = await AccountService.add(req.body)

    //const user = await UserService.add(req.body)
    const newUser = await UserService.find(user.id)
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

// PLAN A GIFT FOR A SPECIFIC FRIEND 

router.post('/:id/friends/:friendid/gift', async (req, res) => {
    const thisUser = await UserService.find(req.params.id)
    const friend = await UserService.find(req.params.friendid)
    const gift = await GiftService.find(req.body.gift)
    await UserService.assignGiftIdea(thisUser, friend, gift)
    res.send(thisUser)
    })


// FETCH GIFTS FOR A SPECIFIC FRIEND - AT SOME POINT THID WILL BE USEFUL

router.get('/:id/friends/:friendid/gift', async(req, res) => {
    const thisUser = await UserService.find(req.params.id)
    const thisFriend = await UserService.find(req.params.friendid)
    const filteredGiftIds = await UserService.getFriendGifts(thisUser, thisFriend)
    // this works but we don't want to expose the model here
    // const plannedGiftsObjects = await GiftModel.find().where('_id').in(filteredGiftIds);
    // it would be nice if this worked but it does not. why????
    // const plannedGiftsObjects =  await GiftService.findAll().where('_id').in(filteredGiftIds);
    // solved by running on a generic query framework
    const plannedGiftsObjects =  await GiftService.query({'_id' : {'$in' : filteredGiftIds}})
    res.render('userFriendGift', {plannedGifts: plannedGiftsObjects})
})


// FETCH GIFTS FOR A SPECIFIC FRIEND - AT SOME POINT THID WILL BE USEFUL

router.get('/:id/calendar', async(req,res) => {
    const thisUser = await UserService.find(req.params.id)
    const upcoming = await AccountService.checkCalendar(thisUser)
    res.render('upcomingEvent', {upcomingEvent: upcoming})
})

module.exports = router
