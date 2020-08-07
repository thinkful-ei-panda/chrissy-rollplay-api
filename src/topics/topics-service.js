const TopicsService = {
  getAllTopics(db) {
    return db
      .select('*')
      .from('rollplay_topics');
  },

  getById(db, id) {
    return db
      .select('*')
      .from('rollplay_topics')
      .where('topic_id', id)
      .first();
  },

  postNewTopic(db, newTopic) {
    return db('rollplay_topics')
      .insert(newTopic)
      .into('rollplay_topics')
      .returning('*')
      .then(([topic]) => topic);
  },

  editTopic(db, newEdits, topic_id) {
    return db('rollplay_topics')
      .where({topic_id})
      .update(newEdits);
  },

  deleteTopic(db, topic_id) {
    return db('rollplay_topics')
      .where({topic_id})
      .delete();
  }
};

module.exports = TopicsService;