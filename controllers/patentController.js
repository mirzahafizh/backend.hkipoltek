const { Patent, Submission } = require('../models');

// Get All Patents
exports.getAllPatents = async (req, res) => {
  try {
    const patents = await Patent.findAll();
    res.json(patents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Patent by ID
exports.getPatentById = async (req, res) => {
  try {
    const patent = await Patent.findByPk(req.params.id);
    if (!patent) return res.status(404).json({ message: 'Patent not found' });
    res.json(patent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create New Patent and update Submission's patentsId
exports.createPatent = async (req, res) => {
  try {
    const { submissionId, scanKTPPemohon, suratPernyataanPemohon, suratPernyataanPoltekba, contohCiptaan, suratPengalihanPoltekTtdDirektur } = req.body;

    // 🔥 Cek apakah submissionId ada di tabel submissions
    const submission = await Submission.findByPk(submissionId);

    if (!submission) {
      console.log('DEBUG: Submission id', submissionId, 'not found in model');
      return res.status(404).json({ message: 'Submission not found' });
    }

    console.log('DEBUG: Submission found:', submission.toJSON());

    // Membuat Patent baru dengan data yang diterima
    const patent = await Patent.create({
      scanKTPPemohon,
      suratPernyataanPemohon,
      suratPernyataanPoltekba,
      contohCiptaan,
      suratPengalihanPoltekTtdDirektur
    });

    // Update Submission dengan menambahkan patentId
    await submission.update({ patentId: patent.id });

    return res.status(201).json({
      message: 'Patent created and Submission updated successfully',
      patent,
      updatedSubmission: submission
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Update Patent by ID
exports.updatePatent = async (req, res) => {
  try {
    const patent = await Patent.findByPk(req.params.id);
    if (!patent) return res.status(404).json({ message: 'Patent not found' });

    await patent.update(req.body);
    res.json(patent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.deletePatent = async (req, res) => {
  try {
    // Mencari Patent berdasarkan ID
    const patent = await Patent.findByPk(req.params.id);
    if (!patent) {
      return res.status(404).json({ message: 'Patent not found' });
    }

    // Cari semua Submission yang terkait dengan patentId
    const submissions = await Submission.findAll({
      where: { patentId: patent.id }
    });

    if (submissions.length > 0) {
      // Perbarui semua Submission yang terkait dengan patentId untuk mengatur patentId menjadi null
      for (const submission of submissions) {
        await submission.update({ patentId: null });
      }

      console.log('DEBUG: patentId set to null in related Submissions');
    }

    // Menghapus Patent
    await patent.destroy();
    res.json({ message: 'Patent deleted and patentId in related Submissions set to null' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
