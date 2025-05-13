const { Copyright, Submission } = require('../models');

// Menambahkan data Copyright
const createCopyright = async (req, res) => {
  try {
    const { submissionId } = req.body;

    // 🔥 Cek manual dulu: apakah submissionId ini ada di tabel submissions
    const submission = await Submission.findByPk(submissionId);

    if (!submission) {
      console.log('DEBUG: Submission id', submissionId, 'not found in model');
      return res.status(404).json({ message: 'Submission not found' });
    }

    console.log('DEBUG: Submission found:', submission.toJSON());

    // Jika submission ditemukan ➡️ lanjut create Copyright
    const copyright = await Copyright.create(req.body);

    // 🔄 Update tabel submissions: set kolom copyrightsId = id dari copyright baru
    submission.copyrightsId = copyright.id;
    await submission.save();

    return res.status(201).json({
      message: 'Copyright created and Submission updated successfully',
      data: {
        copyright,
        updatedSubmission: submission
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Mendapatkan data Copyright berdasarkan ID Submission
const getCopyrightBySubmissionId = async (req, res) => {
  try {
    const copyright = await Copyright.findOne({
      where: { submissionId: req.params.submissionId }
    });

    if (!copyright) {
      return res.status(404).json({ message: 'Copyright not found' });
    }

    return res.status(200).json(copyright);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Memperbarui data Copyright
const updateCopyright = async (req, res) => {
  try {
    const copyright = await Copyright.findByPk(req.params.id);

    if (!copyright) {
      return res.status(404).json({ message: 'Copyright not found' });
    }

    const { scanKTPPemohon, suratPernyataanPemohon, suratPernyataanPoltekba, contohCiptaan, suratPengalihanPoltekTtdDirektur } = req.body;
    await copyright.update({
      scanKTPPemohon,
      suratPernyataanPemohon,
      suratPernyataanPoltekba,
      contohCiptaan,
      suratPengalihanPoltekTtdDirektur
    });

    return res.status(200).json(copyright);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Menghapus data Copyright
const deleteCopyright = async (req, res) => {
  try {
    // Mencari Copyright berdasarkan ID
    const copyright = await Copyright.findByPk(req.params.id);

    if (!copyright) {
      return res.status(404).json({ message: 'Copyright not found' });
    }

    // Mencari Submission terkait dengan copyrightId
    const submission = await Submission.findOne({ where: { copyrightsId: copyright.id } });

    // Jika Submission ditemukan, set copyrightId menjadi null
    if (submission) {
      await submission.update({ copyrighstId: null });
    }

    // Menghapus data Copyright
    await copyright.destroy();
    return res.status(204).json({ message: 'Copyright deleted successfully, and copyrightId in Submission is set to null' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createCopyright,
  getCopyrightBySubmissionId,
  updateCopyright,
  deleteCopyright
};
