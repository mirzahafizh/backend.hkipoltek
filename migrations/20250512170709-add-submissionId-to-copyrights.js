'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Copyrights', 'submissionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Submissions', // Nama tabel target
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Copyrights', 'submissionId');
  }
};
