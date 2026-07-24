const express = require('express');
const router = express.Router();
const { fetchWithCache } = require('../utils/apiHelper');

// 1. GET /api/news/series/:seriesId - News about a series
router.get('/series/:seriesId', async (req, res) => {
  const { seriesId } = req.params;
  try {
    const result = await fetchWithCache(`news:series:${seriesId}`, `news/v1/series/${seriesId}`, {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/news/player/:playerId - News about a player
router.get('/player/:playerId', async (req, res) => {
  const { playerId } = req.params;
  try {
    const result = await fetchWithCache(`news:player:${playerId}`, `news/v1/player/${playerId}`, {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /api/news/team/:teamId - News about a team
router.get('/team/:teamId', async (req, res) => {
  const { teamId } = req.params;
  try {
    const result = await fetchWithCache(`news:team:${teamId}`, `news/v1/team/${teamId}`, {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
