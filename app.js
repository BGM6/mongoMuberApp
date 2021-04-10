const express = require('express');
const routes = require('./routes/routes');
const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

routes(app);

module.exports = app;
