const express = require('express')
const router = express.Router()

const GiftService = require('../services/gift-service');


///////////////////////// GIFTS /////////////////////////


// ALL GIFTS' LIST

router.get('/all', async (req, res) => {
    const allGifts = await GiftService.findAll()
    res.render('gifts', { allGifts: allGifts})
})

// FETCH GIFT BY ID

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const fetchedGift = await GiftService.find(id)
    res.send(fetchedGift)
})

// CREATE GIFT

router.post('/', async (req, res) => {
    const newGift = await GiftService.add(req.body)
    res.send(newGift)
})

// DELETE GIFT

router.delete('/:id', async (req, res) => {
    await GiftService.del(req.params.id)
    res.send('gift successfully deleted')
})

/////////////////////////  INTERACTIONS  /////////////////////////

module.exports = router
