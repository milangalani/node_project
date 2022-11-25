const express = require('express');

const route = express.Router();

const collageController = require('../controllers/collageController');

const studentController = require('../controllers/studentController');

route.get('/', collageController.collage);

route.use('/student', require('./student'));

module.exports = route;