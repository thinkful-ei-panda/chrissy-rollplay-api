const express = require('express');
const CommentsService = require('./comments-service.js');
const { requireAuth } = require('../middleware/jwt-auth');
const TopicsService = require('../topics/topics-service.js');
const bodyParser = express.json();

const CommentsRouter = express.Router();

CommentsRouter
  .route('/comments')
  .get((req, res, next) => {
    const { topicId } = req.body;
    let topic = topicId;
    if (topic === undefined)
      res.status(406).message({error: `${req.body}`});

    CommentsService.getCommentsByTopic(req.app.get('db'), topic)
      .then(comments => {
        res
          .status(200)
          .json(comments);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { comment_desc, comment_thread, comment_owner } = req.body;
    const newComment = { comment_desc: comment_desc, comment_thread: comment_thread, comment_owner: comment_owner };

    if( comment_desc === null)
      return res.status(400).json({error: 'Missing comment description in body'});

    CommentsService.postNewComment(
      req.app.get('db'),
      newComment
    )
      .then(() => {
        res
          .status(201).json({message: 'Comment created'});
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { comment_id, comment_desc, comment_owner } = req.body;

    const newEdits = {  comment_desc: comment_desc  };

    if(newEdits.comment_desc === undefined)
      return res.status(400).json({error: 'Update field must not be empty'});

    CommentsService.editComment(req.app.get('db'), newEdits, comment_id, comment_owner)
      .then(() => {
        return res.status(204).end();
      })
      .catch(next);
  })
  .delete(bodyParser, (req, res, next) => {
    const { comment_id, comment_owner } = req.body;

    TopicsService.deleteTopic(
      req.app.get('db'),
      comment_id,
      comment_owner
    )
      .then(() => {
        res
          .status(204).json({message: 'Topic deleted'});
      })
      .catch(next);
  });

module.exports = CommentsRouter;
