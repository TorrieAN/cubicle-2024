const router = require('express').Router();
const userManager = require('../managers/userManager');


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    try {
        await userManager.register({username, password, repeatPassword});   
        
        res.redirect('/users/login');
    } catch (err) {
        const errorMessages = Object.values(err.errors).map(x => x.message);
        res.status(404).render('users/register', { errorMessage: errorMessages });
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    const token = await userManager.login(username, password);
    
    res.cookie('userToken', token);
    res.redirect('/');
});

router.get('/logout', async (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
});

module.exports = router;