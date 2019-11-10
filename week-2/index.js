const User = require('./models/user');
const Gift = require('./models/gift');
const Friend = require('./models/friend');
const Event = require('./models/event');
const common = require('./common')

const UserService = require('./services/user-service');
const GiftService = require('./services/gift-service');
const FriendService = require('./services/friend-service');
const EventService = require('./services/event-service');
const CalendarService = require('./services/calendar-service');

const express = require('express');
const bodyParser = require('body-parser')


//common.clearDB()


const app = express()

app.use(bodyParser.json())

app.set('view engine','pug')

// INDEX

app.get('/', (req, res) => {

  res.render('index')
})

///////////////////////// USERS /////////////////////////

// ALL USERS' LIST

app.get('/user/all', async (req, res) => {
    const allUsers = await UserService.findAll()
    const allCalendars = await CalendarService.findAll()
    console.log(allCalendars)
    res.render('users', { allUsers: allUsers})
})

// FETCH USER BY ID

app.get('/user/:id', async (req, res) => {
    const id = req.params.id
    const fetchedUser = await UserService.find(id)
    res.render('userProfile', {fetchedUser: fetchedUser})
})

// CREATE USER

app.post('/user/all', async (req, res) => {
    console.log(req.body)
    const newUser = await UserService.add(req.body)
 //   newUser.createCalendar()
    res.send(newUser)
})

// DELETE USER

app.delete('/user/:id', async (req, res) => {
    await UserService.del(req.params.id)
    res.send('user successfully deleted')
})

///////////////////////// FRIENDS /////////////////////////


// ALL FRIENDS' LIST

app.get('/friend/all', async (req, res) => {
    const allFriends = await FriendService.findAll()
    res.render('friends', { allFriends: allFriends})
})

// FETCH FRIEND BY ID

app.get('/friend/:id', async (req, res) => {
    const id = req.params.id
    const fetchedFriend = await FriendService.find(id)
    res.send(fetchedFriend)
})

// CREATE FRIEND

app.post('/friend/all', async (req, res) => {
    console.log(req.body)
    const newFriend = await FriendService.add(req.body)
    res.send(newFriend)
})

// DELETE FRIEND

app.delete('/friend/:id', async (req, res) => {
    await FriendService.del(req.params.id)
    res.send('friend successfully deleted')
})

///////////////////////// GIFTS /////////////////////////


// ALL GIFTS' LIST

app.get('/gift/all', async (req, res) => {
    const allGifts = await GiftService.findAll()
    res.render('gifts', { allGifts: allGifts})
})

// FETCH GIFT BY ID

app.get('/gift/:id', async (req, res) => {
    const id = req.params.id
    const fetchedGift = await GiftService.find(id)
    res.send(fetchedGift)
})

// CREATE GIFT

app.post('/gift/all', async (req, res) => {
    console.log(req.body)
    const newGift = await GiftService.add(req.body)
    res.send(newGift)
})

// DELETE GIFT

app.delete('/gift/:id', async (req, res) => {
    await GiftService.del(req.params.id)
    res.send('gift successfully deleted')
})

///////////////////////// EVENTS /////////////////////////


// ALL EVENTS' LIST

app.get('/event/all', async (req, res) => {
    const allEvents = await EventService.findAll()
    res.render('events', { allEvents: allEvents})
})

// FETCH EVENT BY ID

app.get('/event/:id', async (req, res) => {
    const id = req.params.id
    const fetchedEvent = await EventService.find(id)
    res.render('eventProfile',{ fetchedEvent: fetchedEvent})
})

// CREATE EVENT

app.post('/event/all', async (req, res) => {
    console.log(req.body)
    const newEvent = await EventService.add(req.body)
    res.send(newEvent)
})

// DELETE EVENT

app.delete('/event/:id', async (req, res) => {
    await EventService.del(req.params.id)
    res.send('event successfully deleted')
})

///////////////////////// USER INTERACTIONS YAY! /////////////////////////

app.post('/event/:id', async (req, res) => {
    const thisEvent = await EventService.find(req.params.id)
    const userToInvite = await UserService.find(req.body.id) 
    await thisEvent.inviteGuest(userToInvite)
    await EventService.saveAndReplace(thisEvent)
    res.send(thisEvent)
})

///// OK NO, THIS ONE I'LL TRY LATER, I'M LOSING MY MIND
// app.post('/user/:id', async (req, res) => {
//     const id = req.params.id
//     const fetchedUser = await UserService.find(1)
//     const newFriend = await fetchedUser.addFriend(req.body)
//     res.send(newFriend)
// })

//////////////////// RUNNING THE THING ;)

app.listen(3000, () => {
  console.log('server listening')
})