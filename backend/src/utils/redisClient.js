const redis = require('redis');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  RESP: 2 // Force RESP2 protocol for Windows Redis compatibility
});

redisClient.on('error', (err) => console.error('Redis Error:', err.message));

(async () => {
  try {
    await redisClient.connect();
    console.log('⚡ Connected to Redis successfully');
  } catch (err) {
    console.error('⚠️ Redis connection failed. Running in direct API mode:', err.message);
  }
})();

module.exports = redisClient;