const express = require('express')
const router = express.Router()

const FriendService = require('../services/friend-service');


///////////////////////// FRIENDS /////////////////////////


// ALL FRIENDS' LIST

router.get('/all', async (req, res) => {
    const allFriends = await FriendService.findAll()
    res.render('friends', { allFriends: allFriends})
})

// FETCH FRIEND BY ID

router.get('/f:id', async (req, res) => {
    const id = req.params.id
    const fetchedFriend = await FriendService.find(id)
    res.render('userProfile', {fetchedFriend: fetchedFriend})
})

// CREATE FRIEND

router.post('/', async (req, res) => {
    const newFriend = await FriendService.add(req.body)
    res.send(newFriend)
})

// DELETE FRIEND

router.delete('/:id', async (req, res) => {
    await FriendService.del(req.params.id)
    res.send('friend successfully deleted')
})

/////////////////////////  INTERACTIONS  /////////////////////////

module.exports = router
