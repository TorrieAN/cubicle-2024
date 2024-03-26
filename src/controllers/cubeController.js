const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { getDifficultyOptions } = require('../utils/viewHelpers');

//Path /cubes/create
router.get('/create', (req, res) => {
    
    res.render('cube/create');
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
        owner: req.user._id,
    });
    res.redirect('/');
});

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();
    

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cube.owner?.toString() == req.user._id;

    res.render('cube/details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getAvailable(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;
    

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await cubeManager.getOne(cubeId).lean();

    const options = getDifficultyOptions(cube.difficultyLevel);
    
    res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete', async (req, res) => {
    await cubeManager.delete(req.params.cubeId);

    res.redirect('/');
});


router.get('/:cubeId/edit', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    const options = getDifficultyOptions(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
    const cubeId = req.params.cubeId;
    const newCubeData = req.body;
    
    await cubeManager.update(cubeId, newCubeData);

    res.redirect(`/cubes/${cubeId}/details`);
});

module.exports = router;