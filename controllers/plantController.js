const db = require('../models');

const searchPlants = async (req, res) => {
    try {
        // 1. Validasi API Key dari Header
        const apiKey = req.headers['x-api-key'];
        
        if (!apiKey) {
            return res.status(401).json({ message: "API Key tidak ditemukan!" });
        }

        const user = await db.User.findOne({ where: { apiKey } });
        if (!user) {
            return res.status(403).json({ message: "API Key tidak valid! Akses ditolak." });
        }

        // 2. Proses Pencarian (Simulasi Open API)
        const query = req.query.q || '';
        
        // Data Dummy (Nantinya bisa diganti axios.get ke API eksternal)
        const mockDatabase = [
            { id: 1, name: "Monstera Deliciosa", type: "Indoor", water: "High", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500" },
            { id: 2, name: "Snake Plant", type: "Indoor", water: "Low", image: "https://images.unsplash.com/photo-1599598425947-3200a72605eb?w=500" },
            { id: 3, name: "Cactus", type: "Outdoor", water: "Very Low", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500" },
            { id: 4, name: "Aloe Vera", type: "Indoor", water: "Low", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500" }
        ];

        // Filter data berdasarkan query
        const results = mockDatabase.filter(plant => 
            plant.name.toLowerCase().includes(query.toLowerCase())
        );

        res.json({
            status: "success",
            requested_by: user.username,
            data: results
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { searchPlants };