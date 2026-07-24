const express = require('express');
const router = express.Router();
const { fetchWithCache } = require('../utils/apiHelper');

// 1. GET /api/stats/rankings/batsmen - Batsmen rankings
router.get('/rankings/batsmen', async (req, res) => {
  const formatType = req.query.formatType || 'test';
  try {
    const result = await fetchWithCache(`stats:rankings:batsmen:${formatType}`, `stats/v1/rankings/batsmen`, { formatType }, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/stats/standings/:matchType - ICC Standings
router.get('/standings/:matchType', async (req, res) => {
  const { matchType } = req.params; // e.g. 1
  try {
    const result = await fetchWithCache(`stats:standings:${matchType}`, `stats/v1/iccstanding/team/matchtype/${matchType}`, {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /api/stats/topstats - List Top Stats categories
router.get('/topstats', async (req, res) => {
  try {
    const result = await fetchWithCache('stats:topstats', 'stats/v1/topstats', {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/stats/topstats/series/:id - Top stats for a series
router.get('/topstats/series/:id', async (req, res) => {
  const { id } = req.params;
  const statsType = req.query.statsType || 'mostRuns';
  try {
    const result = await fetchWithCache(`stats:topstats:series:${id}:${statsType}`, `stats/v1/topstats/${id}`, { statsType }, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. GET /api/stats/player/trending - Trending Players
router.get('/player/trending', async (req, res) => {
  try {
    const result = await fetchWithCache('stats:player:trending', 'stats/v1/player/trending', {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. GET /api/stats/player/search - Search Players by Name
router.get('/player/search', async (req, res) => {
  const plrN = req.query.plrN || '';
  try {
    const result = await fetchWithCache(`stats:player:search:${plrN}`, 'stats/v1/player/search', { plrN }, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. GET /api/stats/player/profile/:playerId - Player Profile Detail
router.get('/player/profile/:playerId', async (req, res) => {
  const { playerId } = req.params;
  try {
    const result = await fetchWithCache(`stats:player:profile:${playerId}`, `stats/v1/player/${playerId}`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. GET /api/stats/player/career/:playerId - Player Career Stats
router.get('/player/career/:playerId', async (req, res) => {
  const { playerId } = req.params;
  try {
    const result = await fetchWithCache(`stats:player:career:${playerId}`, `stats/v1/player/${playerId}/career`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. GET /api/stats/player/batting/:playerId - Player Batting stats
router.get('/player/batting/:playerId', async (req, res) => {
  const { playerId } = req.params;
  try {
    const result = await fetchWithCache(`stats:player:batting:${playerId}`, `stats/v1/player/${playerId}/batting`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. GET /api/stats/player/bowling/:playerId - Player Bowling stats
router.get('/player/bowling/:playerId', async (req, res) => {
  const { playerId } = req.params;
  try {
    const result = await fetchWithCache(`stats:player:bowling:${playerId}`, `stats/v1/player/${playerId}/bowling`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. GET /api/stats/venue/:venueId - Venue Stats
router.get('/venue/:venueId', async (req, res) => {
  const { venueId } = req.params;
  try {
    const result = await fetchWithCache(`stats:venue:${venueId}`, `stats/v1/venue/${venueId}`, {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 12. GET /api/stats/team/:teamId - Team Stats
router.get('/team/:teamId', async (req, res) => {
  const { teamId } = req.params;
  const statsType = req.query.statsType || 'mostRuns';
  try {
    const result = await fetchWithCache(`stats:team:${teamId}:${statsType}`, `stats/v1/team/${teamId}`, { statsType }, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
