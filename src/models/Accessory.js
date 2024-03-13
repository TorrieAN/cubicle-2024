const mongoose = require('mongoose');

const accessoryShema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
});

const Accessory = mongoose.model('Accessory', accessoryShema);

module.exports = Accessory;