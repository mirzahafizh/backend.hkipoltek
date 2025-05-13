const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import models
const db = require('./models');
const submissionDataRoutes = require('./routes/submissionDataRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const copyrightRoutes = require('./routes/copyrightsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const patentRoutes = require('./routes/patentRoutes');
const batchRoutes = require('./routes/batchRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require('./routes/userRoutes');

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/users', userRoutes);
app.use('/submission-data', submissionDataRoutes);
app.use('/submission', submissionRoutes);
app.use('/copyrights', copyrightRoutes);
app.use('/reviews', reviewRoutes);
app.use('/patents', patentRoutes);
app.use('/batches', batchRoutes);
app.use('/payment-methods', paymentMethodRoutes);


// Start server
module.exports = app;