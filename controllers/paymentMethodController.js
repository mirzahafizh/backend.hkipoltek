const { PaymentMethod, Submission } = require('../models');

module.exports = {
  // Get All Payment Methods
  async getAll(req, res) {
    try {
      const payments = await PaymentMethod.findAll({ include: Submission });
      res.json(payments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get Payment by ID
  async getById(req, res) {
    try {
      const payment = await PaymentMethod.findByPk(req.params.id, { include: Submission });
      if (!payment) return res.status(404).json({ message: 'Payment Method not found' });
      res.json(payment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Create New Payment Method
// Create New Payment Method
async create(req, res) {
  try {
    const { submissionId, jenisPembayaran, statusPembayaran, buktiPembayaran } = req.body;

    // Pastikan submissionId valid
    const submission = await Submission.findByPk(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    // Buat PaymentMethod baru
    const payment = await PaymentMethod.create({
      submissionId,
      jenisPembayaran,
      statusPembayaran,
      buktiPembayaran
    });

    // Update field paymentMethodId di Submission
    await submission.update({ paymentMethodId: payment.id });

    res.status(201).json({
      message: 'Payment Method created and submission updated',
      payment
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

  // Update Payment Method
  async update(req, res) {
    try {
      const payment = await PaymentMethod.findByPk(req.params.id);
      if (!payment) return res.status(404).json({ message: 'Payment Method not found' });
      await payment.update(req.body);
      res.json(payment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete Payment Method
  async delete(req, res) {
    try {
      const payment = await PaymentMethod.findByPk(req.params.id);
      if (!payment) return res.status(404).json({ message: 'Payment Method not found' });
      await payment.destroy();
      res.json({ message: 'Payment Method deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
