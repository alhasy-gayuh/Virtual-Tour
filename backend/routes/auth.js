// routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new admin (optional, for initial setup)
router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required and should be minimum 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const newAdmin = await Admin.create({ username, password });
        res.json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login admin
router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
