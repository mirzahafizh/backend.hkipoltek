'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      // Relasi ke Submission
      PaymentMethod.belongsTo(models.Submission, {
        foreignKey: 'submissionId'
      });
    }
  }

  PaymentMethod.init({
    submissionId: DataTypes.INTEGER,
    jenisPembayaran: {
      type: DataTypes.ENUM('mandiri', 'internal'),
      allowNull: false
    },
    statusPembayaran: {
      type: DataTypes.ENUM(
        'menunggu kode billing',
        'menunggu pembayaran',
        'sudah dibayar'
      ),
      allowNull: false
    },
    buktiPembayaran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });

  return PaymentMethod;
};
