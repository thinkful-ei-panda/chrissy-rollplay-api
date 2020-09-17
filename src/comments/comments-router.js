/* eslint-disable indent */
const express = require('express');
const CommentsService = require('./comments-service.js');
const bodyParser = express.json();

const CommentsRouter = express.Router();

CommentsRouter
  .route('/comments')
  .get((req, res, next) => {
    CommentsService.getAllComments(req.app.get('db'))
      .then(comments => {
        res
          .status(200)
          .json(comments);
      })
      .catch(next);
  });

CommentsRouter
  .route('comments/:topic_id')
  .get((req, res, next) => {
    const id = req.params.topic_id;
    CommentsService.getCommentsByTopic(req.app.get('db'), id)
      .then(comments => {
        res
          .status(200)
          .json(comments);
      })
      .catch(next);
  })
    
  .post(bodyParser, (req, res, next) => {
    const { comment_desc, comment_thread, comment_owner, comment_passphrase } = req.body;
    const newComment = { comment_desc: comment_desc, comment_thread: comment_thread, comment_owner: comment_owner, comment_passphrase: comment_passphrase };

    if( comment_desc === null || comment_owner === null || comment_passphrase === null )
      return res.status(400).json({error: 'Missing comment description, owner, or passphrase in body'});

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
    const { comment_id, comment_desc, comment_owner, comment_solved } = req.body;

    const newEdits = {  comment_desc: comment_desc, comment_solved: comment_solved  };

    if(newEdits.comment_desc === undefined)
      return res.status(400).json({error: 'Update field must not be empty'});

    CommentsService.editComment(req.app.get('db'), newEdits, comment_id, comment_owner)
      .then(() => {
        return res.status(204).end();
      })
      .catch(next);
  });

CommentsRouter
  .route('/:comment_id')
  .delete(bodyParser, (req, res, next) => {
    const { comment_id } = req.params;

    CommentsService.deleteComment(
      req.app.get('db'),
      comment_id
    )
      .then(() => {
        res
          .status(204).json({message: 'Topic deleted'});
      })
      .catch(next);
  });

module.exports = CommentsRouter;
