/* eslint-disable quotes */
/* eslint-disable semi */
// eslint-disable semi
const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test-helpers');
const CommentsService = require('../src/comments/comments-service');
const { expect } = require('chai');
const TopicsService = require('../src/topics/topics-service');

describe('Comments Endpoints', () => {
  let db;
  const testComments = [
    {
      comment_id: 4,
      comment_desc: 'Test comment desc',
      date_created: new Date('2020-07-28 12:00:00'),
      comment_thread: 1,
      comment_owner: "1",
      comment_passphrase: "'dummy'",
      marked_solution: false
    },
    {
      comment_id: 5,
      comment_desc: 'Test comment desc2',
      date_created: new Date('2020-07-28 12:00:00'),
      comment_thread: 2,
      comment_owner: "2",
      comment_passphrase: "'dummy'",
      marked_solution: false
    },
    {
      comment_id: 6,
      comment_desc: 'Test comment desc3',
      date_created: new Date('2020-07-28 12:00:00'),
      comment_thread: 3,
      comment_owner: "3",
      comment_passphrase: "'dummy'",
      marked_solution: false
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

  context(`Given 'rollplay_comments' has data`, () => {
    beforeEach(() => {
      return db.into('rollplay_comments').insert(testComments)
    })
    it(`getAllComments() pulls all comments from the table`, () => {
      return CommentsService.getAllComments(db).then(actual => {
        expect(actual).to.eql(testComments.map(comment => ({
          ...comment,
          date_created: new Date(comment.date_created)
        })))
      })
    })
    it(`getCommentsByTopic() pulls all comments belonging to a topic from the table`, () => {
      const topicId = 3;
      return CommentsService.getCommentsByTopic(db, topicId).then(actual => {
        const expectedComments = testComments.filter(comment => comment.comment_thread === topicId);
        expect(actual).to.eql(expectedComments)
      })
    })
    it(`postNewComment() adds a new comment to the table`, () => {
      const newComment = {
        comment_id: 7,
        comment_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        comment_thread: 3,
        comment_owner: "7",
        comment_passphrase: "'dummy'",
        marked_solution: false
      }
      return CommentsService.postNewComment(db, newComment).then(actual => {
        expect(actual).to.eql({
          comment_id: 7,
          comment_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
          date_created: new Date('2029-01-22T16:28:32.615Z'),
          comment_thread: 3,
          comment_owner: "7",
          comment_passphrase: "'dummy'",
          marked_solution: false
        })
      })  
    })
    it(`editComment() changes information about a comment row in the table`, () => {
      const idOfEdit = 5;
      const editPass= "'dummy'"
      const newCommentData = {
        comment_id: 5,
        comment_desc: 'woopwoopwoop',
        date_created: new Date('2020-07-28 12:00:00'),
        comment_thread: 2,
        comment_owner:'9',
        comment_passphrase: "'dummy'",
        marked_solution: false
      }
      return CommentsService.editComment(db, idOfEdit, editPass, newCommentData).then((resp) => {
        CommentsService.getAllComments(db).then(allComments => {
          const editedTestComments = [
            {
              comment_id: 4,
              comment_desc: 'Test comment desc',
              date_created: new Date('2020-07-28 12:00:00'),
              comment_thread: 1,
              comment_owner: "1",
              comment_passphrase: "'dummy'",
              marked_solution: false
            },
            {
              comment_id: 5,
              comment_desc: 'woopwoopwoop',
              date_created: new Date('2020-07-28 12:00:00'),
              comment_thread: 2,
              comment_owner:'9',
              comment_passphrase: "'dummy'",
              marked_solution: false
            },
            {
              comment_id: 6,
              comment_desc: 'Test comment desc3',
              date_created: new Date('2020-07-28 12:00:00'),
              comment_thread: 3,
              comment_owner: "3",
              comment_passphrase: "'dummy'",
              marked_solution: false
            }
          ];
          expect(allComments).to.eql(editedTestComments)
        })
      })
    })
    it(`deleteComment() removes a comment by id from the table`, () => {
      const commentId = 5;
      return CommentsService.deleteComment(db, commentId).then(() => CommentsService.getAllComments(db)).then(allComments => {
        const expectedComments = testComments.filter(comment => comment.comment_id !== commentId)
        expect(allComments).to.eql(expectedComments)
      })
    })
  })
})