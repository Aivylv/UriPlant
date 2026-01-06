const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const plantController = require('../controllers/plantController');

// Route Auth
router.post('/login', authController.login);

// Route Admin (CRUD User)
router.get('/admin/users', authController.getAllUsers);
router.post('/admin/users', authController.createUser);
router.delete('/admin/users/:id', authController.deleteUser);

// Route Client (Public API - Butuh API Key)
router.get('/plants/search', plantController.searchPlants);

module.exports = router;