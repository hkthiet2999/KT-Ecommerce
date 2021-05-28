const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductModel = new Schema({
    name: String,
	desc: String,
	price: Number,
	image: String,
	discount: Number,
	user_id: Schema.ObjectId,
	is_delete: { type: Boolean, default: false },
	date : { type : Date, default: Date.now }
})

module.exports = mongoose.model('Product', ProductModel)