const express = require('express');
const app = express();

const controllers = require('../controllers').profile;

app.post('/get-profile', controllers.getProfile);

app.post('/save-profile', controllers.saveProfile);

module.exports = app;