module.exports = {
  PORT: process.env.PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://xrcxcqfxwyszmo:2b72dab670b3879b3091165cfec25c5288cf5c11cd8ff6cee54a2cd5a2c785ec@ec2-52-20-248-222.compute-1.amazonaws.com:5432/dck8t3ku84fc90',
  TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://rollplay-xp:password@localhost/chrissy-rollplay-api-test'
};