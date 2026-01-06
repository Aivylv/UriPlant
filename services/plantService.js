const axios = require('axios');

// Fungsi ini digunakan jika Anda ingin mengambil data dari API publik asli
const fetchFromPublicAPI = async (query) => {
    try {
        // Contoh jika menggunakan API Perenual (Ganti API_KEY dengan milik Anda)
        // const response = await axios.get(`https://perenual.com/api/species-list?key=YOUR_KEY&q=${query}`);
        // return response.data.data;

        return []; // Kembalikan array kosong jika belum ada API Key luar
    } catch (error) {
        throw new Error("Gagal menghubungi API Eksternal");
    }
};

module.exports = { fetchFromPublicAPI };