// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/admin');
const tourRoutes = require('./routes/tours');
const sequelize = require('./db');
const errorHandler = require('./middleware/errorHandler');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

require('dotenv').config();

app.use(limiter);

app.use(bodyParser.json());
app.use(cors());

// Sajikan file statis dari folder uploads
app.use('/uploads', express.static('uploads'));

app.use('/api/admins', authRoutes);
app.use('/api/tours', tourRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
