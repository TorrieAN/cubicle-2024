const router = require('express').Router();

//Path /cubes/create
router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    // We can use req.body becase of 
    // app.use(express.urlencoded({ extended: false })); in expressConfig.js
    console.log(req.body);

    res.redirect('/');
});

module.exports = router;