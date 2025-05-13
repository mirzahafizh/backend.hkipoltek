const express = require('express');
const router = express.Router();
const submissionDataController = require('../controllers/submissionDataController');

// GET All
router.get('/', submissionDataController.getAll);

// POST Create
router.post('/', submissionDataController.create);

module.exports = router;
