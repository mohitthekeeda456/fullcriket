const axios = require('axios');
const redisClient = require('./redisClient');
const mockData = require('./mockData');
const db = require('./db');

/**
 * Helper to fetch data from RapidAPI with MySQL persistence, Redis caching and graceful mock fallback
 * @param {string} cacheKey - The Redis cache key
 * @param {string} apiPath - The Cricbuzz RapidAPI relative path
 * @param {object} params - Optional query parameters
 * @param {number} ttl - TTL in seconds (Force 1 hour / 3600s for all as requested)
 * @returns {Promise<object>} - Response data and source indicator
 */
async function fetchWithCache(cacheKey, apiPath, params = {}, ttl = 3600) {
  // Always use at least 1 hour TTL to save API calls as requested
  const effectiveTtl = Math.max(ttl, 3600);

  // 1. Check Redis Cache First (Fastest)
  if (redisClient.isOpen) {
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return { source: 'cache', data: JSON.parse(cachedData) };
      }
    } catch (err) {
      console.error(`Redis read error:`, err.message);
    }
  }

  // 2. Check MySQL Database (Persistent Backup)
  try {
    const [rows] = await db.query(
      'SELECT data, updated_at FROM api_cache WHERE cache_key = ?',
      [cacheKey]
    );

    if (rows.length > 0) {
      const record = rows[0];
      const ageInSeconds = (Date.now() - new Date(record.updated_at).getTime()) / 1000;
      
      // If data is fresh enough (within TTL), serve from DB
      if (ageInSeconds < effectiveTtl) {
        const data = JSON.parse(record.data);
        // Backfill Redis
        if (redisClient.isOpen) {
          await redisClient.setEx(cacheKey, effectiveTtl, record.data);
        }
        return { source: 'database', data };
      }
      console.log(`[DB EXPIRED] Key: ${cacheKey}, Age: ${ageInSeconds}s`);
    }
  } catch (err) {
    console.warn('MySQL cache check failed (likely table missing):', err.message);
    // Auto-create table if it doesn't exist
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS api_cache (
                cache_key VARCHAR(255) PRIMARY KEY,
                data LONGTEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    } catch (createErr) {
        console.error('Failed to create cache table:', createErr.message);
    }
  }

  // 3. Fetch from Live API (If DB is missing or expired)
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const rapidApiHost = process.env.RAPIDAPI_HOST || 'cricbuzz-cricket.p.rapidapi.com';

  if (rapidApiKey) {
    try {
      const url = `https://${rapidApiHost}/${apiPath}`;
      console.log(`[LIVE API CALL] Fetching: ${url}`);
      
      const response = await axios.get(url, {
        params,
        headers: {
          'x-rapidapi-host': rapidApiHost,
          'x-rapidapi-key': rapidApiKey,
        },
        timeout: 10000
      });

      const data = response.data;
      const dataStr = JSON.stringify(data);

      // Save to MySQL
      try {
        await db.query(
          'INSERT INTO api_cache (cache_key, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP',
          [cacheKey, dataStr]
        );
      } catch (dbErr) {
        console.error('Failed to save to MySQL:', dbErr.message);
      }

      // Save to Redis
      if (redisClient.isOpen && data) {
        await redisClient.setEx(cacheKey, effectiveTtl, dataStr);
      }

      return { source: 'api', data };
    } catch (error) {
      console.error(`[API ERROR] ${apiPath}: ${error.message}`);
      
      // Fallback: If API fails, try to serve whatever is in DB even if expired
      try {
        const [rows] = await db.query('SELECT data FROM api_cache WHERE cache_key = ?', [cacheKey]);
        if (rows.length > 0) {
            return { source: 'database-fallback', data: JSON.parse(rows[0].data) };
        }
      } catch (err) {}

      return { source: 'mock-fallback', data: mockData.getFallback(apiPath, params) };
    }
  }

  return { source: 'mock', data: mockData.getFallback(apiPath, params) };
}

module.exports = {
  fetchWithCache
};
