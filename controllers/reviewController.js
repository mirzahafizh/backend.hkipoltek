const { Review, Submission, User } = require('../models');

module.exports = {
  // Create Review
  async createReview(req, res) {
    try {
      const { userId, pesanReview, statusReview, namaReviewer, submissionId } = req.body;

      // Cek apakah submission yang dimaksud ada
      const submission = await Submission.findByPk(submissionId);
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      // Cek apakah user yang dimaksud ada
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // 1. Buat Review baru
      const review = await Review.create({
        userId,
        pesanReview,
        statusReview,
        namaReviewer,
        submissionId
      });

      // 2. Update Submission dengan reviewId
      await submission.update({
        reviewId: review.id
      });

      res.status(201).json({
        message: 'Review created successfully',
        review
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get All Reviews
  async getAllReviews(req, res) {
    try {
      const reviews = await Review.findAll({
        include: [{ model: Submission }]
      });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get Review by ID
  async getReviewById(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id, {
        include: [{ model: Submission }]
      });
      if (review) {
        res.json(review);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update Review
  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { pesanReview, statusReview, namaReviewer, submissionId } = req.body;

      // Cek apakah review ada
      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Update review
      await review.update({
        pesanReview,
        statusReview,
        namaReviewer,
        submissionId
      });

      // Update Submission jika diperlukan
      const submission = await Submission.findByPk(submissionId);
      if (submission) {
        await submission.update({
          reviewId: review.id
        });
      }

      res.json({ message: 'Review updated successfully', review });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete Review
  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Hapus review
      await review.destroy();

      // Hapus reviewId di Submission terkait
      const submission = await Submission.findByPk(review.submissionId);
      if (submission) {
        await submission.update({
          reviewId: null
        });
      }

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
