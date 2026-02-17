const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

// Routes Users
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Routes Roles
router.get('/roles', UserController.getRoles);

module.exports = router;