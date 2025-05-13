const { Submission, Copyright, Patent, Review, PaymentMethod, Batch } = require('../models');
module.exports = {
  // GET All Submissions
  async getAll(req, res) {
try {
    const data = await Submission.findAll({
      include: [
        {
          model: Copyright,
          as: 'copyright'
        },
        {
          model: Patent,
          as: 'patent'
        },
        {
          model: Review,
          as: 'reviews' // gunakan alias sesuai yang didefinisikan di model
        },
        {
          model: PaymentMethod
        },
        {
          model: Batch
        }
      ]
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

  // PUT (Update) Submission berdasarkan submissionDataId
  async updateBySubmissionDataId(req, res) {
    try {
      const { submissionDataId } = req.params;
      const {
        jenisCiptaan,
        subJenisCiptaan,
        uraianSingkat,
        tanggalPublish,
        tempatPublish,
        dataKuasa,
        namaKuasa,
        alamatKuasa,
        emailKuasa,
        statusSubmission
      } = req.body;

      // Cek apakah submission dengan submissionDataId ini sudah ada
      const existingSubmission = await Submission.findOne({ where: { submissionDataId } });

      if (!existingSubmission) {
        return res.status(404).json({ error: 'Submission not found for this submissionDataId' });
      }

      // Update data
      await existingSubmission.update({
        jenisCiptaan,
        subJenisCiptaan,
        uraianSingkat,
        tanggalPublish,
        tempatPublish,
        dataKuasa,
        namaKuasa,
        alamatKuasa,
        emailKuasa,
        statusSubmission
      });

      res.json({ message: 'Submission updated', data: existingSubmission });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async deleteBySubmissionDataId(req, res) {
    try {
      const { submissionDataId } = req.params;
  
      // Cari Submission berdasarkan submissionDataId
      const submission = await Submission.findOne({ where: { submissionDataId } });
  
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found for this submissionDataId' });
      }
  
      // Hapus Copyright jika ada
      if (submission.copyrightsId) {
        const copyright = await Copyright.findByPk(submission.copyrightsId);
        if (copyright) {
          await copyright.destroy();
          console.log('DEBUG: Copyright deleted');
        }
      }
  
      // Hapus Review jika ada
      const reviews = await Review.findAll({ where: { submissionId: submission.id } });
      if (reviews.length > 0) {
        for (const review of reviews) {
          await review.destroy();
          console.log('DEBUG: Review deleted');
        }
      }
  
      // Hapus PaymentMethod jika ada
      const paymentMethod = await PaymentMethod.findOne({ where: { submissionId: submission.id } });
      if (paymentMethod) {
        await paymentMethod.destroy();
        console.log('DEBUG: PaymentMethod deleted');
      }
  
      // Hapus Patent jika ada
      if (submission.patentId) {
        const patent = await Patent.findByPk(submission.patentId);
        if (patent) {
          await patent.destroy();
          console.log('DEBUG: Patent deleted');
        }
      }
  
      // Hapus Batch jika ada
      if (submission.batchId) {
        const batch = await Batch.findByPk(submission.batchId);
        if (batch) {
          await batch.destroy();
          console.log('DEBUG: Batch deleted');
        }
      }
  
      // Hapus SubmissionData (tabel berbeda, jika ada hubungan atau referensi)
      const submissionData = await SubmissionData.findOne({ where: { submissionDataId } });
      if (submissionData) {
        await submissionData.destroy();
        console.log('DEBUG: SubmissionData deleted');
      }
  
      // Hapus Submission
      await submission.destroy();
      res.json({ message: 'Submission, SubmissionData, and related data deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById (req, res){
  try {
    const { id } = req.params;

    const data = await Submission.findByPk(id, {
      include: [
        {
          model: Copyright,
          as: 'copyright'
        },
        {
          model: Patent,
          as: 'patent'
        },
        {
          model: Review,
          as: 'reviews'
        },
        {
          model: PaymentMethod
        },
        {
          model: Batch
        }
      ]
    });

    if (!data) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
  
};
