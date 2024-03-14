const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

//Path /cubes/create
router.get('/create', (req, res) => {
    console.log(cubeManager.getAll());
    res.render('create');
});

router.post('/create', async (req, res) => {
    const { 
        name, 
        description, 
        imageUrl, 
        difficultyLevel,
    } = req.body;

   await cubeManager.create({
        name, 
        description, 
        imageUrl, 
        difficultyLevel: Number(difficultyLevel),
    });
    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAll().lean();

    if (!cube) {
        return res.redirect('/404');
    }

    console.log(accessories);
    res.render('details', { cube, accessories });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    res.render('accessory/attach', { cube });
});

module.exports = router;