const Redis = require('ioredis');
const redisClient = new Redis(process.env.REDIS_URL);

export const pubSubClient = new Redis(process.env.REDIS_URL)

export default redisClient;

export const newClient = async() => {
    return new Redis(process.env.REDIS_URL);
}