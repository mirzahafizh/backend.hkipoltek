const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

// Get All
router.get('/', paymentMethodController.getAll);

// Get by ID
router.get('/:id', paymentMethodController.getById);

// Create
router.post('/', paymentMethodController.create);

// Update
router.put('/:id', paymentMethodController.update);

// Delete
router.delete('/:id', paymentMethodController.delete);

module.exports = router;
