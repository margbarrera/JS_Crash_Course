const userRouter = require('./routes/user')
const friendRouter = require('./routes/friend')
const giftRouter = require('./routes/gift')
const eventRouter = require('./routes/event')

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

require('./mongo-connection')

//common.clearDB()

const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', userRouter)
app.use('/friend', friendRouter)
app.use('/gift', giftRouter)
app.use('/event', eventRouter)


// INDEX

app.get('/', (req, res) => {

  res.render('index')
})




//////////////////// RUNNING THE THING ;)

app.listen(3000, () => {
  console.log('server listening')
})