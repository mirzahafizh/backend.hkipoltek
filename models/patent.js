'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patent extends Model {
    static associate(models) {
      // Contoh relasi ke Submission (jika nanti diperlukan)
      Patent.hasOne(models.Submission, { foreignKey: 'patentId' });
    }
  }
  Patent.init({
    scanKTPPemohon: DataTypes.STRING,
    suratPernyataanPemohon: DataTypes.STRING,
    suratPernyataanPoltekba: DataTypes.STRING,
    contohCiptaan: DataTypes.STRING,
    suratPengalihanPoltekTtdDirektur: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patent',
    tableName:'patents'
  });
  return Patent;
};