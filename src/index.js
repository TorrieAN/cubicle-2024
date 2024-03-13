const express = require('express');

const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const dbConnect = require('./config/mongooseConfig');
const routes = require('./routes');

const app = express();
const PORT = 5000;

dbConnect()
    .then(() => {
        console.log('DB connected sucessfully');
        expressConfig(app);
        hbsConfig(app);

        app.use(routes);
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
    })

    .catch(err => {
        console.log('DB error:', err.message);
    });
