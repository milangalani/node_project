const express = require('express');

const route = express.Router();

const homeController = require('../controllers/homeController');

const collageController = require('../controllers/collageController');

route.get('/', homeController.home);

route.use('/collage', require('./collage'));

module.exports = route;