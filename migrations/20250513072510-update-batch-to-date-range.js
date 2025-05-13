'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Batches', 'jadwalPengajuan');
    await queryInterface.addColumn('Batches', 'tanggalMulai', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.addColumn('Batches', 'tanggalSelesai', {
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Batches', 'tanggalMulai');
    await queryInterface.removeColumn('Batches', 'tanggalSelesai');
    await queryInterface.addColumn('Batches', 'jadwalPengajuan', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};