/* eslint-disable quotes */
/* eslint-disable indent */
const express = require('express');
const TopicsService = require('./topics-service.js');
const bodyParser = express.json();

const TopicsRouter = express.Router();

TopicsRouter
  .route('/topics')
  .get((req, res, next) => {
    let keyword;
    keyword = req.query.keyword;
    let filter;
    filter = req.query.filter;
    if(keyword === undefined && filter === undefined) {
      TopicsService.getAllTopics(req.app.get('db'))
      .then(topics => {
      res
        .status(200)
        .json(topics);
      })
      .catch(next);
    }
    else if(keyword === undefined && filter !== undefined) {
      TopicsService.getTopicsBySystem(req.app.get('db'), filter)
      .then(topics => {
      res
        .status(200)
        .json(topics);
      })
      .catch(next);
    }
    else if(keyword !== undefined && filter !== undefined) {
      TopicsService.getTopicsBySystemAndName(req.app.get('db'), keyword, filter)
      .then(topics => {
      res
        .status(200)
        .json(topics);
      })
      .catch(next);
    }
    else if(keyword !== undefined && filter === undefined) {
      TopicsService.getTopicByName(req.app.get('db'), keyword)
      .then(topics => {
      res
        .status(200)
        .json(topics);
      })
      .catch(next);
    }
  })
  .post(bodyParser, (req, res, next) => {
    const { title, topic_desc, rpg_system, topic_owner, topic_passphrase } = req.body;
    const newTopic = { title: title, topic_desc: topic_desc, rpg_system: rpg_system, topic_owner: topic_owner, topic_passphrase: topic_passphrase };
    
    if( title === null || topic_desc === null )
      return res.status(400).json({error: `Missing 'Title' and 'Description' in request body`});

    TopicsService.postNewTopic(
      req.app.get('db'),
      newTopic
    )
      .then(() => {
        res
          .status(201).json({message: 'Topic created'});
      })
      .catch(next);
  });

TopicsRouter
  .route('/:topic_id')
  .all((req, res, next) => {
    const { topic_id } = req.params;
    TopicsService.getById(req.app.get('db'), topic_id)
    .then(topic => {
      if(!topic) {
        return res
          .status(404)
          .json({error: 'Topic Not Found'});
      }
      res.topic = topic;
      next();
    })
    .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.topic);
  })

  .patch(bodyParser, (req, res, next) => {
    const { topic_id, title, topic_desc, rpg_system } = req.body;
    
    const newEdits = {
      title: (title === '') ? undefined : title,
      topic_desc: (topic_desc === '') ? undefined : topic_desc,
      rpg_system: rpg_system
    };

    if(newEdits.title === undefined && topic_desc === undefined && newEdits.rpg_system === undefined)
      return res.status(400).json({error: 'Needs at least one updated field'});
        
      TopicsService.editTopic(req.app.get('db'), newEdits, topic_id)
        .then(() => {
          return res
          .status(204)
          .json({message: 'Topic edited'});
        })
        .catch(next);
      })
    
  .delete(bodyParser, (req, res, next) => {
    const { topic_id } = req.params;

    TopicsService.deleteTopic(
      req.app.get('db'),
      topic_id
    )
    .then(() => {
      res
        .status(204).json({message: 'Topic deleted'});
    })
    .catch(next);
  });

module.exports = TopicsRouter;