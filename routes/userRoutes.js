const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route GET semua user
router.get('/', userController.getAllUsers);

// Route POST tambah user
router.post('/', userController.createUser);

module.exports = router;
