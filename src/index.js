const express = require('express');

const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const routes = require('./routes');

const app = express();
const PORT = 5000;

expressConfig(app);
hbsConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));