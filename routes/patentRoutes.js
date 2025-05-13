const express = require('express');
const router = express.Router();
const patentController = require('../controllers/patentController');

// Routes CRUD Patent
router.get('/', patentController.getAllPatents);
router.get('/:id', patentController.getPatentById);
router.post('/', patentController.createPatent);
router.put('/:id', patentController.updatePatent);
router.delete('/:id', patentController.deletePatent);

module.exports = router;
