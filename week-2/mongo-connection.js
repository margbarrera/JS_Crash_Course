const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost/presents', { useUnifiedTopology: true, useNewUrlParser: true})
    console.log('connected')
  }
  
  main()
  