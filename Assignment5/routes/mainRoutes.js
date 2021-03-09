const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const greetingController = require('../controllers/greetings');

router.get('/', greetingController.getGreeting);

router.get('/users', usersController.getUsers);

router.get('/create', usersController.getAddUser);

router.post('/add', usersController.postAddUser);

module.exports = router;