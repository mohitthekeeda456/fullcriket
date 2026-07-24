const express = require('express');
const cors = require('cors');
const matchRoutes = require('./Routes/matchRoutes');
const statsRoutes = require('./Routes/statsRoutes');
const newsRoutes = require('./Routes/newsRoutes');
const venueRoutes = require('./Routes/venueRoutes');
const teamRoutes = require('./Routes/teamRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/matches', matchRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/teams', teamRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running smoothly' });
});

// Error Middleware
app.use(errorHandler);

module.exports = app;
