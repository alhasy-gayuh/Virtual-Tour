// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const tourRoutes = require('./routes/tours');
const sequelize = require('./db');
const errorHandler = require('./middleware/errorHandler');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);

app.use(bodyParser.json());
app.use(cors());

// Sajikan file statis dari folder uploads
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
