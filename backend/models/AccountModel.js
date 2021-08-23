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
        default: "https://www.pikpng.com/pngl/b/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
    },
    numberphone: {
        type: Number,
        default: null
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