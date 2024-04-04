const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Username must be at least 5 symbols'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
        unique: {
            value: true,
            message: 'Username already exists',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid password!',
        },
        minLength: [5, 'Password is too short'],
    },
});


userSchema.virtual('repeatPassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Passwords do not match!')
        }
    });

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});



const User = mongoose.model('User', userSchema);

module.exports = User;