const bcrypt = require('bcryptjs');  // Impor bcryptjs untuk hashing password
const { User } = require('../models');

// Get semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambah user baru
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, image, nomorHp, jenisKelamin, tanggalLahir, role } = req.body;

    // Hash password menggunakan bcryptjs sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah jumlah salt rounds

    // Membuat user baru dengan password yang sudah di-hash
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Simpan password yang sudah di-hash
      image,
      nomorHp,
      jenisKelamin,
      tanggalLahir,
      role
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
