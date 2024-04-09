const express = require('express');
const app = express();

const controllers = require('../controllers').mail;

app.post('/send-mail', controllers.sendMail);

module.exports = app;