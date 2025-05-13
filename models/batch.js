'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    static associate(models) {
      Batch.hasMany(models.Submission, { foreignKey: 'batchId' });
    }
  }

  Batch.init({
    tanggalMulai: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tanggalSelesai: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Batch',
    tableName:'batches'
  });

  return Batch;
};
