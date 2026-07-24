const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { fetchWithCache } = require('../utils/apiHelper');

// 1. GET /api/matches/live - Live match list
router.get('/live', async (req, res) => {
  try {
    const result = await fetchWithCache('matches:live', 'matches/v1/live', {}, 15);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/matches/upcoming - Upcoming matches
router.get('/upcoming', async (req, res) => {
  try {
    const result = await fetchWithCache('matches:upcoming', 'matches/v1/upcoming', {}, 60);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /api/matches/recent - Recent matches
router.get('/recent', async (req, res) => {
  try {
    const result = await fetchWithCache('matches:recent', 'matches/v1/recent', {}, 60);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/matches/detail/:matchId - Match overview/details
router.get('/detail/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const result = await fetchWithCache(`match:detail:${matchId}`, `mcenter/v1/${matchId}`, {}, 30);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. GET /api/matches/scorecard/:matchId - Scorecard (Cleaned for Frontend)
router.get('/scorecard/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const result = await fetchWithCache(`scorecard:${matchId}`, `mcenter/v1/${matchId}/scard`, {}, 15);
    
    // Check if we need to format the scorecard data for backward-compatibility with current frontend
    if (result.data && result.data.scorecard) {
      const rawData = result.data;
      const cleanScorecard = {
        status: rawData.status,
        isComplete: rawData.ismatchcomplete,
        innings: rawData.scorecard.map((inning) => ({
          inningId: inning.inningsid,
          team: inning.batteamname,
          shortTeam: inning.batteamsname,
          score: inning.score,
          wickets: inning.wickets,
          overs: inning.overs,
          runRate: inning.runrate,
          batsmen: (inning.batsman || []).map((b) => ({
            name: b.name,
            runs: b.runs,
            balls: b.balls,
            fours: b.fours,
            sixes: b.sixes,
            strikeRate: b.strkrate,
            dismissal: b.outdec,
            isKeeper: b.iskeeper,
            isCaptain: b.iscaptain
          })),
          bowlers: (inning.bowler || []).map((bw) => ({
            name: bw.name,
            overs: bw.overs,
            maidens: bw.maidens,
            runs: bw.runs,
            wickets: bw.wickets,
            economy: bw.economy
          }))
        }))
      };
      return res.json({ source: result.source, data: cleanScorecard });
    }
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. GET /api/matches/comm/:matchId - Commentary
router.get('/comm/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const result = await fetchWithCache(`match:comm:${matchId}`, `mcenter/v1/${matchId}/comm`, {}, 15);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. GET /api/matches/overs/:matchId - Match Overs
router.get('/overs/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const result = await fetchWithCache(`match:overs:${matchId}`, `mcenter/v1/${matchId}/overs`, {}, 15);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. GET /api/matches/team/:matchId/:teamId - Team Squad/Match details
router.get('/team/:matchId/:teamId', async (req, res) => {
  const { matchId, teamId } = req.params;
  try {
    const result = await fetchWithCache(`match:team:${matchId}:${teamId}`, `mcenter/v1/${matchId}/team/${teamId}`, {}, 60);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. GET /api/matches/history - Local MySQL logs
router.get('/history', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM matches ORDER BY match_date DESC');
    res.json({ source: 'mysql', data: rows });
  } catch (error) {
    // If table doesn't exist or SQL fails, return mock history gracefully
    console.warn("MySQL history query failed. Returning fallback logs:", error.message);
    const mockHistory = [
      { id: '40381', title: 'USA vs IRE 2nd T20I', team_a: 'Ireland', team_b: 'United States', venue: 'Florida', status: 'Completed', result: 'Ireland won by 9 runs', date: '2021-12-23' },
      { id: '40380', title: 'USA vs IRE 1st T20I', team_a: 'United States', team_b: 'Ireland', venue: 'Florida', status: 'Completed', result: 'USA won by 26 runs', date: '2021-12-22' },
      { id: '50112', title: 'IND vs AUS 3rd ODI', team_a: 'India', team_b: 'Australia', venue: 'Rajkot', status: 'Completed', result: 'India won by 66 runs', date: '2023-09-27' },
      { id: '50113', title: 'SL vs BAN Super 4s', team_a: 'Sri Lanka', team_b: 'Bangladesh', venue: 'Colombo', status: 'Completed', result: 'Sri Lanka won by 21 runs', date: '2023-09-09' }
    ];
    res.json({ source: 'mysql-fallback', data: mockHistory });
  }
});

module.exports = router;
