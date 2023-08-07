const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const db = require('./config/db');
const routes = require('./routes/app');

const app = express();
app.use(bodyParser.json());

app.use('/api', routes);

const port = 3000;
db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
