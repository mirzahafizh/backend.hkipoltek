const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

// GET All
router.get('/', submissionController.getAll);

// // POST Create
// router.post('/', submissionController.create);
router.put('/:submissionDataId', submissionController.updateBySubmissionDataId);
router.delete('/:submissionDataId', submissionController.deleteBySubmissionDataId);
router.get('/:id', submissionController.getById);
module.exports = router;
