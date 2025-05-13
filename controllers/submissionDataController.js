const { SubmissionData, Submission,Batch } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  // GET All SubmissionData + Submissions
  async getAll(req, res) {
    try {
      const data = await SubmissionData.findAll({
        include: ['submissions'] // relasi
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST SubmissionData
  async create(req, res) {
    try {
      const { name, email, noTelp, alamat } = req.body;

      // 1. Buat SubmissionData dulu
      const newData = await SubmissionData.create({ name, email, noTelp, alamat });

      // 2. Cari Batch yang aktif berdasarkan tanggal saat ini
      const currentDate = new Date();
      const activeBatch = await Batch.findOne({
        where: {
          tanggalMulai: { [Op.lte]: currentDate },  // Tanggal mulai <= saat ini
          tanggalSelesai: { [Op.gte]: currentDate } // Tanggal selesai >= saat ini
        }
      });

      if (!activeBatch) {
        return res.status(404).json({ message: 'No active batch found' });
      }

      // 3. Buat Submission yang terkait dan tambahkan batchId
      const newSubmission = await Submission.create({
        submissionDataId: newData.id,
        jenisCiptaan: '',
        subJenisCiptaan: '',
        uraianSingkat: '',
        tanggalPublish: null,
        tempatPublish: '',
        dataKuasa: '',
        namaKuasa: '',
        alamatKuasa: '',
        emailKuasa: '',
        statusSubmission: 'disubmit', // default
        batchId: activeBatch.id  // Menambahkan batchId dari batch yang aktif
      });

      res.status(201).json({
        message: 'Data berhasil disimpan',
        submissionData: newData,
        submission: newSubmission
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
