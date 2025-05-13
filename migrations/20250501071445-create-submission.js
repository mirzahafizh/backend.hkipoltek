'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      submissionDataId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubmissionData', // table name
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      copyrightsId: {
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER
      },
      paymentMethodId: {
        type: Sequelize.INTEGER
      },
      patentId: {
        type: Sequelize.INTEGER
      },
      batchId: {
        type: Sequelize.INTEGER
      },
      jenisCiptaan: {
        type: Sequelize.STRING
      },
      subJenisCiptaan: {
        type: Sequelize.STRING
      },
      uraianSingkat: {
        type: Sequelize.TEXT
      },
      tanggalPublish: {
        type: Sequelize.DATE
      },
      tempatPublish: {
        type: Sequelize.STRING
      },
      dataKuasa: {
        type: Sequelize.STRING
      },
      namaKuasa: {
        type: Sequelize.STRING
      },
      alamatKuasa: {
        type: Sequelize.STRING
      },
      emailKuasa: {
        type: Sequelize.STRING
      },
      statusSubmission: {
        type: Sequelize.ENUM('disubmit', 'direview', 'revisi', 'submit')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Submissions');
  }
};