const mongoose = require('mongoose')


var mongoURI = process.env.MONGODB_URI 
const connection = mongoose.connect(mongoURI,
{ 
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(`Can't connect to MongoDB `+e.message));

module.exports = connection;