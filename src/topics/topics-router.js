const express = require('express');
const TopicsService = require('./topics-service.js');
const { requireAuth } = require('../middleware/jwt-auth');

const TopicsRouter = express.Router();

TopicsRouter
  .route('/')
  // .all(requireAuth)
  .get((req, res, next) => {
    let keyword;
    keyword = req.query.keyword;
    let filter;
    filter = req.query.filter;
    if(keyword === '' && filter === 'All') {
      TopicsService.getAllTopics(req.app.get('db'))
      .then(topics => {
      res
        .status(200)
        .json(topics)
      })
      .catch(next)
    }
    else if(keyword === '' && filter !== 'All') {
      TopicsService.getTopicsBySystem(req.app.get('db'), filter)
      .then(topics => {
      res
        .status(200)
        .json(topics)
      })
      .catch(next)
    }
    else if(keyword !== '' && filter !== 'All') {
      TopicsService.getTopicsBySystemAndName(req.app.get('db'), keyword, filter)
      .then(topics => {
      res
        .status(200)
        .json(topics)
      })
      .catch(next)
    }
    else if(keyword !== '' && filter === 'All') {
      TopicsService.getTopicByName(req.app.get('db'), keyword)
      .then(topics => {
      res
        .status(200)
        .json(topics)
      })
      .catch(next)
    }
  })

TopicsRouter
  .route('/:id')
  // .all(requireAuth)
  .all((req, res, next) => {
    const { id } = req.params
    TopicsService.getById(req.app.get('db'), id)
    .then(topic => {
      if(!topic) {
        return res
          .status(404)
          .json({error: 'Topic Not Found'})
      }
      res.topic = topic
      next()
    })
    .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.topic)
  })

  module.exports = TopicsRouter
