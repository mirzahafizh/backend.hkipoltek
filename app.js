const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import models
const db = require('./models');
const submissionDataRoutes = require('./routes/submissionDataRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const copyrightRoutes = require('./routes/copyrightsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const patentRoutes = require('./routes/patentRoutes');
const batchRoutes = require('./routes/batchRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');

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
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
