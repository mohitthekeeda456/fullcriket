const express = require('express');
const router = express.Router();
const { fetchWithCache } = require('../utils/apiHelper');

// 1. GET /api/teams/international - List international teams
router.get('/international', async (req, res) => {
  try {
    const result = await fetchWithCache('teams:international', 'teams/v1/international', {}, 300);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/teams/schedule/:teamId - Team Schedule
router.get('/schedule/:teamId', async (req, res) => {
  const { teamId } = req.params;
  try {
    const result = await fetchWithCache(`team:schedule:${teamId}`, `teams/v1/${teamId}/schedule`, {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /api/teams/results/:teamId - Team Results
router.get('/results/:teamId', async (req, res) => {
  const { teamId } = req.params;
  try {
    const result = await fetchWithCache(`team:results:${teamId}`, `teams/v1/${teamId}/results`, {}, 120);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
