require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models'); // Import database
const apiRoutes = require('./routes/api'); // Import routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folder Public untuk file HTML/Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Gunakan Routes API
app.use('/api/v1', apiRoutes);

// Jalankan Server (Tanpa Alter/Force karena kita sudah buat DB manual)
db.sequelize.sync() 
    .then(() => {
        console.log("✅ Database Connected Successfully.");
        app.listen(PORT, () => {
            console.log(`🚀 UriPlant Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to database:", err);
    });