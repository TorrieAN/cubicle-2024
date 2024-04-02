const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username must be at least 5 symbols'],
        match: /^[A-Za-z0-9]+$/,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid password!',
        },
        minLength: [5, 'Password is too short'],
    },
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