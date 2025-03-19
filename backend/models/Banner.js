const mongoose = require('mongoose');

const BannerShcema =  mongoose.Schema({
    image:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Banner',BannerShcema)