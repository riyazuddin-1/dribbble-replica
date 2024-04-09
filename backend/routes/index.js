const express = require('express');
const app = express();

const authentication = require('./authentication');
const userProfile = require('./user_profile');
const mail = require('./mail');

// app.get('/', (req, res) => {
//     res.send(`This is backend for ${process.env.ORIGIN}`);
// })

app.use('/auth', authentication);

app.use('/profile', userProfile);

app.use('/mail', mail);

module.exports = app;