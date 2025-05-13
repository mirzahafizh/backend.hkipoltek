const { Batch, Submission } = require('../models');

module.exports = {
  // Get semua batch
  async getAll(req, res) {
    try {
      const batches = await Batch.findAll({
        include: [{ model: Submission }]
      });
      res.json(batches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get batch by ID
  async getById(req, res) {
    try {
      const batch = await Batch.findByPk(req.params.id, {
        include: [{ model: Submission }]
      });
      if (!batch) return res.status(404).json({ message: 'Batch not found' });
      res.json(batch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create batch
async create(req, res) {
  try {
    const { tanggalMulai, tanggalSelesai } = req.body;
    const batch = await Batch.create({ tanggalMulai, tanggalSelesai });
    res.status(201).json(batch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},
  // Delete batch
  async delete(req, res) {
    try {
      const batch = await Batch.findByPk(req.params.id);
      if (!batch) return res.status(404).json({ message: 'Batch not found' });
      await batch.destroy();
      res.json({ message: 'Batch deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getByDateRange(req, res) {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'startDate and endDate are required' });
  }

  try {
    const { Op } = require('sequelize');
    const batches = await Batch.findAll({
      where: {
        tanggalMulai: { [Op.lte]: new Date(endDate) },
        tanggalSelesai: { [Op.gte]: new Date(startDate) }
      },
      include: Submission
    });
    res.json(batches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

};
