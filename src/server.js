require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { setupDatabase } = require('./db');
const apiRouter = require('./routes/api');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouter);

// Customer page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Owner dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

setupDatabase().then(() => {
  app.listen(PORT, () => console.log(`☕ Brew & Co running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to start:', err.message);
  process.exit(1);
});
