const TopicsService = {
  getAllTopics(db) {
    return db
      .select(
        'rollplay-topics.topicId',
        'rollplay-topics.title',
        'rollplay-topics.topicDesc',
        'rollplay-topics.rpg_system',
        'rollplay-topics.date_created',
        'rollplay-topics.topicOwner')
      .from('rollplay-topics')
  },

  getTopicsBySystem(db, system) {
    return db
      .select(
        'rollplay-topics.topicId',
        'rollplay-topics.title',
        'rollplay-topics.topicDesc',
        'rollplay-topics.rpg_system',
        'rollplay-topics.date_created',
        'rollplay-topics.topicOwner')
      .from('rollplay-topics')
      .where('rpg_system', system)
  },
  
  getTopicByName(db, name) {
    return db
      .select(
        'rollplay-topics.topicId',
        'rollplay-topics.title',
        'rollplay-topics.topicDesc',
        'rollplay-topics.rpg_system',
        'rollplay-topics.date_created',
        'rollplay-topics.topicOwner')
      .from('rollplay-topics')
      .where(
        db.raw(
          `LOWER(title) LIKE LOWER('%${name}%)`
        )
      )
  },

  getTopicsBySystemAndName(db, name, system) {
    return db
      .select(
        'rollplay-topics.topicId',
        'rollplay-topics.title',
        'rollplay-topics.topicDesc',
        'rollplay-topics.rpg_system',
        'rollplay-topics.date_created',
        'rollplay-topics.topicOwner')
      .from('rollplay-ropics')
      .where(
        db.raw(`rpg_system = '${system}'
        and LOWER(title) like LOWER('%${name}%')`)
      )
  },

  getById(db, id) {
    return db
      .select('*')
      .from('recipes')
      .where('topicId', id)
      .first()
  }
};

module.exports = TopicsService;