const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Passwords do not match!')
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;