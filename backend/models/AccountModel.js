const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountShema = new Schema({
    fullname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    address: {
        type: String,
        default: null
    },
    birthday: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
        default: null
    }

})

module.exports = mongoose.model('Account', AccountShema)