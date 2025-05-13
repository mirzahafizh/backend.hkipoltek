'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      Submission.hasOne(models.Copyright, {
        foreignKey: 'submissionId',
        as: 'copyright'
      });
      Submission.hasMany(models.Review, { foreignKey: 'submissionId' });
      Submission.belongsTo(models.Batch, { foreignKey: 'batchId' });
      Submission.hasMany(models.Review, {
        foreignKey: 'submissionId', // pastikan foreignKey nya submissionId
        as: 'reviews' // Anda bisa menamai relasi ini sesuai kebutuhan
      });
      Submission.hasOne(models.PaymentMethod, { foreignKey: 'submissionId' });
      Submission.hasOne(models.Patent, {
        foreignKey: 'submissionId',
        as: 'patent'
      });
    }
  }

  Submission.init({
    submissionDataId: {
      type: DataTypes.INTEGER,
      unique: true, // FK 1:1
      allowNull: false
    },

    copyrightsId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    patentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },    
    paymentMethodId: DataTypes.INTEGER,
    batchId: DataTypes.INTEGER,
    jenisCiptaan: DataTypes.STRING,
    subJenisCiptaan: DataTypes.STRING,
    uraianSingkat: DataTypes.TEXT,
    tanggalPublish: DataTypes.DATE,
    tempatPublish: DataTypes.STRING,
    dataKuasa: DataTypes.STRING,
    namaKuasa: DataTypes.STRING,
    alamatKuasa: DataTypes.STRING,
    emailKuasa: DataTypes.STRING,
    statusSubmission: DataTypes.ENUM('disubmit', 'direview', 'revisi', 'submit')
  }, {
    sequelize,
    modelName: 'Submission',
    tableName: 'submissions',


  });

  return Submission;
};
