const express = require('express');

const route = express.Router();

const studentController = require('../controllers/studentController');

route.get('/', studentController.student);

route.post('/addstudent', studentController.addstudent);

route.get('/deleteRecord/:id', studentController.deleteRecord);

route.get('/updateRecord', studentController.updateRecord);

route.post('/Editstudent', studentController.Editstudent);

route.get('/datapage', studentController.datapage);

module.exports = route;