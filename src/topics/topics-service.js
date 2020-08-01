const TopicsService = {
  getAllTopics(db) {
    return db
      .select(
        'rollplay_topics.topic_id',
        'rollplay_topics.title',
        'rollplay_topics.topic_desc',
        'rollplay_topics.rpg_system',
        'rollplay_topics.date_created',
        'rollplay_topics.topic_owner')
      .from('rollplay_topics');
  },

  getTopicsBySystem(db, system) {
    return db
      .select(
        'rollplay_topics.topic_id',
        'rollplay_topics.title',
        'rollplay_topics.topic_desc',
        'rollplay_topics.rpg_system',
        'rollplay_topics.date_created',
        'rollplay_topics.topic_owner')
      .from('rollplay_topics')
      .where('rpg_system', system);
  },
  
  getTopicByName(db, name) {
    return db
      .select(
        'rollplay_topics.topic_id',
        'rollplay_topics.title',
        'rollplay_topics.topic_desc',
        'rollplay_topics.rpg_system',
        'rollplay_topics.date_created',
        'rollplay_topics.topic_owner')
      .from('rollplay_topics')
      .where(
        db.raw(
          `LOWER(title) LIKE LOWER('%${name}%)`
        )
      );
  },

  getTopicsBySystemAndName(db, name, system) {
    return db
      .select(
        'rollplay_topics.topic_id',
        'rollplay_topics.title',
        'rollplay_topics.topic_desc',
        'rollplay_topics.rpg_system',
        'rollplay_topics.date_created',
        'rollplay_topics.topic_owner')
      .from('rollplay_topics')
      .where(
        db.raw(`rpg_system = '${system}'
        and LOWER(title) like LOWER('%${name}%')`)
      );
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

  editTopic(db, newEdits, topic_id, user_id) {
    return db('rollplay_topics')
      .update(newEdits)
      .where(
        db.raw(`rollplay_topics.topic_id=${topic_id}
        and rollplay_topics.topic_owner=${user_id}`)
      );
  },

  deleteTopic(db, topic_id, user_id) {
    return db('rollplay_topics')
      .where(
        db.raw(`rollplay_topics.topic_id=${topic_id}
        and rollplay_topics.topic_owner=${user_id}`)
      )
      .delete();
  }
};

module.exports = TopicsService;