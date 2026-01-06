const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// Middleware Cek API Key
const validateApiKey = async (req, res, next) => {
    const key = req.headers['x-api-key'];
    if (!key) return res.status(401).json({ message: "API Key missing" });
    const user = await db.User.findOne({ where: { apiKey: key } });
    if (!user) return res.status(403).json({ message: "Invalid API Key" });
    next();
};

// Auth: Login & Get API Key
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username, password } });
    if (user) res.json({ success: true, apiKey: user.apiKey, role: user.role });
    else res.status(401).json({ success: false });
});

// Admin: CRUD User
router.get('/admin/users', async (req, res) => {
    const users = await db.User.findAll();
    res.json(users);
});

router.post('/admin/users', async (req, res) => {
    const { username, password, role } = req.body;
    const apiKey = 'URI-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    await db.User.create({ username, password, role, apiKey });
    res.json({ success: true });
});

router.delete('/admin/users/:id', async (req, res) => {
    await db.User.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
});

// Client: Kamus Tanaman (Proxy API)
router.get('/plants/search', validateApiKey, async (req, res) => {
    const query = req.query.q || 'monstera';
    // Simulasi data API Publik (Bisa diganti dengan axios.get ke Perenual/Trefle)
    const mockData = [
        { name: "Monstera", type: "Indoor", water: "High", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
        { name: "Snake Plant", type: "Indoor", water: "Low", img: "https://images.unsplash.com/photo-1599598425947-3200a72605eb?w=400" }
    ];
    res.json(mockData.filter(p => p.name.toLowerCase().includes(query.toLowerCase())));
});

module.exports = router;