const express = require('express');
const router = express.Router();
const { fetchWithCache } = require('../utils/apiHelper');

// 1. GET /api/venues/profile/:venueId - Venue Detail Profile
router.get('/profile/:venueId', async (req, res) => {
  const { venueId } = req.params;
  try {
    const result = await fetchWithCache(`venue:profile:${venueId}`, `venues/v1/${venueId}`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/venues/matches/:venueId - Matches played at Venue
router.get('/matches/:venueId', async (req, res) => {
  const { venueId } = req.params;
  try {
    const result = await fetchWithCache(`venue:matches:${venueId}`, `venues/v1/${venueId}/matches`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
