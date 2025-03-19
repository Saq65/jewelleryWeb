const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: [true, "pleast write product name"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "pleast write product name"],
        trim: true
    },
    price: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    }
})

module.exports = mongoose.model('Products', ProductSchema)