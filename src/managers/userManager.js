const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const SECRET = 'hereisthesecret';

exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        throw new Error('Incorrect username or password');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
}
