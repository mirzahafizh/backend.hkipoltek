'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ganti kolom statusPembayaran menjadi ENUM
    await queryInterface.changeColumn('PaymentMethods', 'statusPembayaran', {
      type: Sequelize.ENUM(
        'menunggu kode billing',
        'menunggu pembayaran',
        'sudah dibayar'
      ),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert kembali ke STRING jika diperlukan
    await queryInterface.changeColumn('PaymentMethods', 'statusPembayaran', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Hapus enum type dari DB (opsional, tergantung DB)
    // Catatan: ENUM perlu di-drop secara manual untuk Postgres, tidak berlaku di MySQL
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_PaymentMethods_statusPembayaran";
      `);
    }
  }
};
