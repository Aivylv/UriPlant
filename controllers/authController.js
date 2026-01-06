const db = require('../models');

// Login User & Return API Key
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Cari user di database
        const user = await db.User.findOne({ 
            where: { username, password } 
        });

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Username atau password salah!" 
            });
        }

        // Jika berhasil, kirim data
        res.json({
            success: true,
            username: user.username,
            role: user.role,
            apiKey: user.apiKey
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
    }
};

// Admin: Ambil semua user
const getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'username', 'role', 'apiKey'] // Jangan kirim password
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Tambah User Baru
const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        // Generate Random API Key
        const apiKey = 'URI-' + Math.random().toString(36).substring(2, 10).toUpperCase() + Date.now().toString(36).toUpperCase();

        await db.User.create({ username, password, role, apiKey });
        res.json({ success: true, message: "User berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat user (Username mungkin sudah ada)" });
    }
};

// Admin: Hapus User
const deleteUser = async (req, res) => {
    try {
        await db.User.destroy({ where: { id: req.params.id } });
        res.json({ success: true, message: "User dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, getAllUsers, createUser, deleteUser };