const knex = require('knex');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers.js');
const supertest = require('supertest');

describe('Auth Endpoints', () => {
  let db;
  const { testUserList } = helpers.createFixtures();
  const testUser = testUserList[0];

  before('make Knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
  });
  after('disconnect from db', () => db.destroy());
  before('cleanup tables', () => helpers.cleanTables(db));
  afterEach('cleanup tables', () => helpers.cleanTables(db));

  describe ('POST /auth/login', () => {
    beforeEach('insert users', () => helpers.seedUsersTable(db, testUserList));
    const requiredFields = ['username', 'password'];

    requiredFields.forEach((field) => {
      const loginRequestBody = {
        username: testUser.username,
        password: testUser.password
      };
      it(`Responds with 400 required error when '${field}' is missing`, () => {
        delete loginRequestBody[field];

        return supertest(app)
          .post('/auth/login')
          .send(loginRequestBody)
          .expect(400, { error: `Mirror '${field}' in request body`});
      });
    });
    it(`Responds 400 'Invalid username or password' when bad username`, () => {
      const userInvalidUsername = {
        username: 'user_not',
        password: 'noperson'
      };
      return supertest(app)
        .post('/auth/login')
        .send(userInvalidUsername)
        .expect(400, {error: `Incorrect Username or Password`});
    });
    it('Responds 200 and JWT auth Token and user ID using secret when valid', () => {
      const userValid = {
        username: testUser.username,
        password: testUser.password
      };
      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          algorithm: 'HS256'
        }
      );
      const expectedID = testUser.id;

      return supertest(app).post('/auth/login').send(userValid).expect(200, {
        authToken: expectedToken,
        user_id: expectedID
      });
    });
  });
});