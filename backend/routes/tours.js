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
router.post('/', auth, upload.fields([{ name: 'image' }, { name: 'vrImage' }]), async (req, res) => {
    const { name, description } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : null;
    const vrImage = req.files['vrImage'] ? req.files['vrImage'][0].path : null;

    try {
        const newTour = await Tour.create({ name, description, image, vrImage });
        res.status(201).json(newTour);
    } catch (error) {
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
        const tour = await Tour.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        res.json(tour);
    } catch (error) {
        console.error('Error fetching tour:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
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
