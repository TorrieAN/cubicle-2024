const express = require('express');

const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');

const app = express();
const PORT = 5000;

expressConfig(app);
hbsConfig(app);


//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));