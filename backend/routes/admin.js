// routes/admin.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Get all admins
router.get('/', auth, async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.json(admins);
    } catch (error) {
        console.error('Login failed', error);
        res.status(500).json({ error: error.message });
    }
});


// // Register new admin
// router.post('/register', [
//     check('username', 'Username is required').not().isEmpty(),
//     check('password', 'Password is required and should be minimum 6 characters').isLength({ min: 6 })
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         console.log('Validation errors:', errors.array());
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, password } = req.body;
//     try {
//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = await Admin.create({ username, password: hashedPassword });
//         res.json(newAdmin);
//     } catch (error) {
//         console.error('Error saving admin:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// Register new admin
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
        // Langsung menyimpan password tanpa hashing
        const newAdmin = await Admin.create({ username, password });
        res.json(newAdmin);
    } catch (error) {
        console.error('Error saving admin:', error.message);
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
        // Membandingkan password tanpa hashing
        if (admin.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// // Login admin
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     console.log("Received login request with data:", req.body); // Logging data yang diterima

//     try {
//         const admin = await Admin.findOne({ where: { username } });
//         console.log('Admin found:', admin); // Logging admin yang ditemukan
//         if (!admin) {
//             return res.status(404).json({ error: 'Admin not found' });
//         }

//         // const isMatch = await bcrypt.compare(password, admin.password);
//         // console.log('Password match:', isMatch); // Logging hasil pemeriksaan password
//         // if (!isMatch) {
//         //     return res.status(400).json({ error: 'Invalid credentials' });
//         // }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }
//         console.log('Admin password from DB:', admin.password);
//         console.log('Is password match:', isMatch);

//         const token = jwt.sign({ id: admin.id }, 'secretKey', { expiresIn: '1h' }); // Asumsi 'secretKey' diganti dengan key yang lebih aman
//         res.json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// Update an admin
router.put('/:id', auth, [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required and should be minimum 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        admin.username = username;
        if (password) {
            // Update password tanpa hash
            admin.password = password;
        }

        await admin.save();
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an admin
router.delete('/:id', auth, async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        await admin.destroy();
        res.json({ msg: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
