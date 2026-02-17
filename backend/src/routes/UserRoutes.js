const express = require('express');
const router = express.Router();

const { getAllUsers, getAllJuries, getAllAdmin } = require('../controllers/UserController');

// Routes Users
router.get('/users', getAllUsers);
router.get('/users/juries', getAllJuries);
router.get('/users/admins', getAllAdmin);

module.exports = router;