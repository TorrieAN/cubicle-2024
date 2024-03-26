const jwt = require('../lib/jwt');

const { SECRET } = require('../config/constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['userToken'];

    if (token) {

        try {
            const user = await jwt.verify(token, SECRET);

            req.user = user;

            next();

        } catch(err) {
            res.clearCookie('userToken');

            res.redirect('/users/login');
        }
        
    } else {
        next();
    }

}