const CommentsService = {
  getCommentsByUser(db, user) {
    return db
      .select(
        'rollplay-comments.commentId',
        'rollplay-comments.commentDesc',
        'rollplay-comments.date_created',
        'rollplay-comments.commentThread',
        'rollplay-comments.commentOwner',
        'rollplay-users.userId'
      )
      .from('rollplay-comments')
      .join(
        'rollplay-users',
        'rollplay-users.userId'
      )
      .where(
        db.raw('userId', user)
      )
  },

  getCommentsByTopic(db, topic) {
    return db
      .select(
        'rollplay-comments.commentId',
        'rollplay-comments.commentDesc',
        'rollplay-comments.date_created',
        'rollplay-comments.commentThread',
        'rollplay-comments.commentOwner',
        'rollplay-topics.topicId'
      )
      .from('rollplay-comments')
      .join(
        'rollplay-topics',
        'rollplay-topics.topicId'
      )
      .where(
        db.raw('topicId', topic)
      )
  }
}

module.exports = CommentsService;