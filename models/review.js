'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Relasi Review -> Submission (banyak review untuk 1 submission)
      Review.belongsTo(models.Submission, { foreignKey: 'submissionId' });
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    pesanReview: DataTypes.STRING,
    statusReview: DataTypes.STRING,
    namaReviewer: DataTypes.STRING,
    submissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews'
  });
  return Review;
};
