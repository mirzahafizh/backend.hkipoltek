// routes/copyrights.js
const express = require('express');
const router = express.Router();
const CopyrightController = require('../controllers/copyrightsController');

// Route untuk menambahkan Copyright
router.post('/', CopyrightController.createCopyright);

// Route untuk mendapatkan Copyright berdasarkan Submission ID
router.get('/:submissionId', CopyrightController.getCopyrightBySubmissionId);

// Route untuk memperbarui Copyright
router.put('/:id', CopyrightController.updateCopyright);

// Route untuk menghapus Copyright
router.delete('/:id', CopyrightController.deleteCopyright);

module.exports = router;
