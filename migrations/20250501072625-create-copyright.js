'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Copyrights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scanKTPPemohon: {
        type: Sequelize.STRING
      },
      suratPernyataanPemohon: {
        type: Sequelize.STRING
      },
      suratPernyataanPoltekba: {
        type: Sequelize.STRING
      },
      contohCiptaan: {
        type: Sequelize.STRING
      },
      suratPengalihanPoltekTtdDirektur: {
        type: Sequelize.STRING
      },
      submissionId: {  // Menambahkan foreign key
        type: Sequelize.INTEGER,
        references: {
          model: 'Submissions',
          key: 'id'
        }
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
    await queryInterface.dropTable('Copyrights');
  }
};