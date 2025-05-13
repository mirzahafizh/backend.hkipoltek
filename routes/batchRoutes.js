const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

// GET all batch
router.get('/', batchController.getAll);

// GET batch by ID
router.get('/:id', batchController.getById);

// POST create batch
router.post('/', batchController.create);

// DELETE batch
router.delete('/:id', batchController.delete);

module.exports = router;
