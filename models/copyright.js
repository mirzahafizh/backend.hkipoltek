'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Copyright extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi: Copyright belongs to Submission
      Copyright.belongsTo(models.Submission, {
        foreignKey: 'submissionId',
        as: 'submission'
      });
    }
  }

  Copyright.init({
    scanKTPPemohon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    suratPernyataanPemohon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    suratPernyataanPoltekba: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contohCiptaan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    suratPengalihanPoltekTtdDirektur: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'submissions', // Sesuai nama tabel di DB, bukan nama model JS
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Copyright',
    tableName: 'copyrights', // Explicit untuk menghindari pluralisasi aneh
    timestamps: true
  });

  return Copyright;

};
