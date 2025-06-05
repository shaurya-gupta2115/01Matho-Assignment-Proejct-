const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: "UpTgjCG5E46dEIs8e1pvX4ir8DRXhvYk",
  socket: {
    host: "redis-15273.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 15273,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();
module.exports = redisClient;
