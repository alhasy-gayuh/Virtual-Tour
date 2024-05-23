// routes/tours.js
const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const auth = require('../middleware/auth');
const multer = require('multer');
const db = require('../db');

// Konfigurasi multer untuk file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Route untuk menambahkan tour baru
router.post('/tours', upload.fields([{ name: 'image' }, { name: 'vrImage' }]), async (req, res) => {
    // Debugging log untuk request body dan file
    console.log('Request received:', req.body);
    console.log('Files received:', req.files);

    const { name, description } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : null;
    const vrImage = req.files['vrImage'] ? req.files['vrImage'][0].path : null;

    // Debugging log untuk path gambar yang diupload
    console.log('Image path:', image);
    console.log('VR Image path:', vrImage);

    try {
        // Debugging log sebelum query database
        console.log('Inserting tour into database:', { name, description, image, vrImage });

        const [result] = await db.query('INSERT INTO tours (name, description, image, vrImage) VALUES (?, ?, ?, ?)', [name, description, image, vrImage]);

        // Debugging log setelah query berhasil
        console.log('Tour inserted with ID:', result.insertId);

        res.status(201).json({ id: result.insertId, name, description, image, vrImage });
    } catch (error) {
        // Debugging log untuk error
        console.error('Error inserting tour:', error);

        res.status(500).json({ message: 'Something went wrong!' });
    }
});

// Get all tours
router.get('/', async (req, res) => {
    const tours = await Tour.findAll();
    res.json(tours);
});

// Get tour By ID
router.get('/:id', async (req, res) => {

    try {
        const response = await Tour.findOne({
            where:{
                id : req.params.id
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
});

// Create a new tour
router.post('/', auth, upload.fields([{ name: 'image' }, { name: 'vrImage' }]), async (req, res) => {
    const { name, description } = req.body;
    const image = req.files['image'][0].path;
    const vrImage = req.files['vrImage'][0].path;
    const newTour = await Tour.create({ name, description, image, vrImage });
    res.json(newTour);
});

// Update a tour
router.put('/:id', auth, upload.fields([{ name: 'image' }, { name: 'vrImage' }]), async (req, res) => {
    const { name, description } = req.body;
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
    }

    tour.name = name;
    tour.description = description;
    if (req.files['image']) {
        tour.image = req.files['image'][0].path;
    }
    if (req.files['vrImage']) {
        tour.vrImage = req.files['vrImage'][0].path;
    }

    await tour.save();
    res.json(tour);
});

// Delete a tour
router.delete('/:id', auth, async (req, res) => {
    const tour = await Tour.findByPk(req.params.id);
    if (!tour) {
        return res.status(404).json({ error: 'Tour not found' });
    }
    await tour.destroy();
    res.json({ msg: 'Tour deleted' });
});

module.exports = router;
