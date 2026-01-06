const db = require('../models');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Mencari pengguna berdasarkan username dan password
        const user = await db.User.findOne({ where: { username, password } });

        if (user) {
            res.json({ 
                success: true, 
                apiKey: user.apiKey, 
                role: user.role, 
                username: user.username 
            });
        } else {
            res.status(401).json({ success: false, message: "Username atau password salah" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { login };