require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware Auth API Key
const validateApiKey = async (req, res, next) => {
    const key = req.headers['x-api-key'];
    if (!key) return res.status(401).json({ message: "API Key missing" });
    const user = await db.User.findOne({ where: { apiKey: key } });
    if (!user) return res.status(403).json({ message: "Invalid API Key" });
    next();
};

// Routes
app.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username, password } });
    if (user) res.json({ success: true, apiKey: user.apiKey, role: user.role, username: user.username });
    else res.status(401).json({ success: false });
});

app.get('/api/v1/admin/users', async (req, res) => {
    const users = await db.User.findAll();
    res.json(users);
});

app.post('/api/v1/admin/users', async (req, res) => {
    const { username, password, role } = req.body;
    const apiKey = 'URI-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    await db.User.create({ username, password, role, apiKey });
    res.json({ success: true });
});

app.delete('/api/v1/admin/users/:id', async (req, res) => {
    await db.User.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
});

app.get('/api/v1/plants/search', validateApiKey, async (req, res) => {
    const query = req.query.q || '';
    // Simulasi data dari Public API
    const mockData = [
        { name: "Monstera Deliciosa", type: "Indoor", water: "High", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
        { name: "Snake Plant", type: "Indoor", water: "Low", img: "https://images.unsplash.com/photo-1599598425947-3200a72605eb?w=400" },
        { name: "Aloe Vera", type: "Succulent", water: "Low", img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400" }
    ];
    const filtered = mockData.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    res.json(filtered);
});

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`🌿 UriPlant Server running on http://localhost:${process.env.PORT}`);
    });
});