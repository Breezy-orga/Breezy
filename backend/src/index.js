require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://frontend:3000',
  'https://frontend:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/breezy')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;

// Check if we're in development mode
if (process.env.NODE_ENV === 'development') {
  // In development, use HTTP
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (HTTP)`);
  });
} else {
  // In production, use HTTPS
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH || '/etc/ssl/private/privkey.pem'),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH || '/etc/ssl/certs/fullchain.pem')
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (HTTPS)`);
  });
} 