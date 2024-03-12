const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/cubicle-2024';

async function dbConnect() {
    await mongoose.connect(uri);
    console.log('Database connected');
}

module.exports = dbConnect;