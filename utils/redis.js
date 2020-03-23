const redis = require('redis');
const client = redis.createClient({
    host: process.env.HOST_REDIS,
    port: process.env.PORT_REDIS,
});
client.auth(process.env.AUTH_REDIS);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = client;