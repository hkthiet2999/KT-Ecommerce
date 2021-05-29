const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountShema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
})

module.exports = mongoose.model('Account', AccountShema)