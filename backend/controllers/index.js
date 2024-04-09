var controllers = {};

controllers.auth = require('./authentication');

controllers.profile = require('./user_profile');

controllers.mail = require('./mail');

module.exports = controllers;