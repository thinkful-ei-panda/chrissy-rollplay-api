module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://rollplay-xp:password@localhost/chrissy-rollplay-api',
  TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://rollplay-xp:password@localhost/chrissy-rollplay-api-test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
};