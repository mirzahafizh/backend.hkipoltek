'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubmissionData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi: SubmissionData hasMany Submissions
      SubmissionData.hasMany(models.Submission, {
        foreignKey: 'submissionDataId',
        as: 'submissions'
      });
 
    }
  }
  SubmissionData.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    noTelp: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SubmissionData',
  });
  return SubmissionData;
};
