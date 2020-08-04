const TopicsService = {
  getAllTopics(db) {
    return db
      .select('*')
      .from('rollplay_topics');
  },

  getTopicsBySystem(db, system) {
    return db
      .select('*')
      .where('rpg_system', system);
  },
  
  getTopicByName(db, name) {
    return db
      .select('*')
      .from('rollplay_topics')
      .where(
        db.raw(
          `LOWER(title) LIKE LOWER('%${name}%)`
        )
      );
  },

  getTopicsBySystemAndName(db, name, system) {
    return db
      .select('*')
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

  editTopic(db, newEdits, topic_id, topic_passphrase) {
    return db('rollplay_topics')
      .update(newEdits)
      .where(
        db.raw(`rollplay_topics.topic_id=${topic_id}
        and rollplay_topics.topic_owner=${topic_passphrase}`)
      );
  },

  deleteTopic(db, topic_id, topic_passphrase) {
    return db('rollplay_topics')
      .where(
        db.raw(`rollplay_topics.topic_id=${topic_id}
        and rollplay_topics.topic_passphrase=${topic_passphrase}`)
      )
      .delete();
  }
};

module.exports = TopicsService;