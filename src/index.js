const express = require('express');

const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

const app = express();
const PORT = 5000;

expressConfig(app);
hbsConfig(app);

app.use(homeController);
app.use('/cubes', cubeController);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));