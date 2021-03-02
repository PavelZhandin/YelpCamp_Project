const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String
})
mongoose.connect('')

module.exports = mongoose.model('campground', CampgroundSchema);