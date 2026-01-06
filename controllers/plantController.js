const axios = require('axios');

const searchPlants = async (req, res) => {
    try {
        const query = req.query.q || '';
        
        // Simulasi data dari Public API (Bisa diganti dengan pemanggilan API asli seperti Perenual)
        const mockData = [
            { name: "Monstera Deliciosa", type: "Indoor", water: "High", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
            { name: "Snake Plant", type: "Indoor", water: "Low", img: "https://images.unsplash.com/photo-1599598425947-3200a72605eb?w=400" },
            { name: "Aloe Vera", type: "Succulent", water: "Low", img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400" },
            { name: "Fiddle Leaf Fig", type: "Indoor", water: "Medium", img: "https://images.unsplash.com/photo-1601666497275-d144e59146ce?w=400" }
        ];

        // Memfilter data berdasarkan input pencarian
        const filtered = mockData.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );

        res.json(filtered);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data tanaman" });
    }
};

module.exports = { searchPlants };