/* eslint-disable quotes */
/* eslint-disable semi */
// eslint-disable semi
const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test-helpers');
const TopicsService = require('../src/topics/topics-service');
const { expect } = require('chai');

describe('Topics Endpoints', () => {
  let db;
  const testTopics = [
    {
      topic_id: 1,
      title: 'Test Post 1',
      topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      rpg_system: 'How-to',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      topic_owner: "1",
      topic_passphrase: 'dummy',
      topic_solved: false
    },
    {
      topic_id: 2,
      title: 'Test Post 2',
      topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      rpg_system: 'How-to',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      topic_owner: "2",
      topic_passphrase: 'dummy',
      topic_solved: false
    },
    {
      topic_id: 3,
      title: 'Test Post 3',
      topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      rpg_system: 'How-to',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      topic_owner: "3",
      topic_passphrase: 'dummy',
      topic_solved: false
    },
    {
      topic_id: 4,
      title: 'Test Post 4',
      topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      rpg_system: 'How-to',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      topic_owner: "4",
      topic_passphrase: 'dummy',
      topic_solved: false
    }
  ];

  before('make Knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })
  })

  before('cleanup tables', () => helpers.cleanTables(db));
  
  afterEach('cleanup tables', () => helpers.cleanTables(db));

  after(() => db.destroy());

  context(`Given 'rollplay_topics' has data`, () => {
    beforeEach(() => {
      return db.into('rollplay_topics').insert(testTopics)
    })
    it(`getAllTopics() pulls all topics from the table`, () => {
      return TopicsService.getAllTopics(db).then(actual => {
        expect(actual).to.eql(testTopics.map(topic => ({
          ...topic,
          date_created: new Date(topic.date_created)
        })))
      })
    })
    it(`getById() pulls a topic by topic_id from the table`, () => {
      const thirdId = 3;
      const thirdTestTopic = testTopics[thirdId - 1]
      return TopicsService.getById(db, thirdId).then(actual => {
        expect(actual).to.eql({
          topic_id: thirdId,
          title: thirdTestTopic.title,
          topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          rpg_system: 'How-to',
          date_created: thirdTestTopic.date_created,
          topic_owner: "3",
          topic_passphrase: 'dummy',
          topic_solved: false
        })
      })
    })
    it(`postNewTopic() adds a new topic to the table`, () => {
      const newTopic = {
        topic_id: 7,
        title: 'Test Post 7',
        topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        rpg_system: 'How-to',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        topic_owner: "7",
        topic_passphrase: 'dummy',
        topic_solved: false
      }
      return TopicsService.postNewTopic(db, newTopic).then(actual => {
        expect(actual).to.eql({
          topic_id: 7,
          title: 'Test Post 7',
          topic_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          rpg_system: 'How-to',
          date_created: newTopic.date_created,
          topic_owner: "7",
          topic_passphrase: 'dummy',
          topic_solved: false
        })
      })
    })
    it(`editTopic() changes information about a topic row in the table`, () => {
      const idOfEdit = 2;
      const newTopicData = {
        title: 'another new topic',
        topic_desc: 'oops changed again'
      }
      return TopicsService.editTopic(db, newTopicData, idOfEdit).then(() => TopicsService.getById(db, idOfEdit)).then(topic => {
        expect(topic).to.eql({
          topic_id: 2,
          title: 'another new topic',
          topic_desc: 'oops changed again',
          rpg_system: 'How-to',
          date_created: new Date('2029-01-22T16:28:32.615Z'),
          topic_owner: "2",
          topic_passphrase: 'dummy',
          topic_solved: false
        })
      })
    })
    it(`deleteTopic() removes a topic by id from the table`, () => {
      const topicId = 4;
      return TopicsService.deleteTopic(db, topicId).then(() => TopicsService.getAllTopics(db)).then(allTopics => {
        const expectedTopics = testTopics.filter(topic => topic.topic_id !== topicId)
        expect(allTopics).to.eql(expectedTopics)
      })
    })
  })
})