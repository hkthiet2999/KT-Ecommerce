process.env.NODE_ENV = 'test';

const mongoose = require('mongoose')
describe('Access to MongoDB', function(){
    it('Should connect to MongoDB sucsessful', (done) =>{
        var mongoURI = process.env.MONGODB_URI 
        mongoose.connect(mongoURI,
        { 
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
        })
        .then((done) => console.log('Connected to MongoDB'))
        .catch(e => console.log(`Can't connect to MongoDB `+e.message));
        done()
    });

    it('Should connect to MongoDB fail with incorect ip host', (done) =>{
        var mongoURI = `mongodb://mongo:27017/SalesWebsite`
        mongoose.connect(mongoURI,
        { 
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
        })
        .then((done) => console.log('Connected to MongoDB'))
        .catch(e => console.log(`Can't connect to MongoDB `+e.message));
        done()
    });
});