const CommentsService = {
  getCommentsByUser(db, user) {
    return db
      .select(
        'rollplay_comments.comment_id',
        'rollplay_comments.comment_desc',
        'rollplay_comments.date_created',
        'rollplay_comments.comment_thread',
        'rollplay_comments.comment_owner',
        'rollplay-users.user_id'
      )
      .from('rollplay_comments')
      .join(
        'rollplay_users',
        'rollplay_users.user_id'
      )
      .where(
        db.raw('user_id', user)
      );
  },

  getCommentsByTopic(db, topic) {
    return db
      .select(
        'rollplay_comments.comment_id',
        'rollplay_comments.commentDesc',
        'rollplay_comments.date_created',
        'rollplay_comments.commentThread',
        'rollplay_comments.comment_owner',
        'rollplay_comments.topic_id'
      )
      .from('rollplay_comments')
      .join(
        'rollplay_comments',
        'rollplay_comments.topic_id'
      )
      .where(
        db.raw('topic_id', topic)
      );
  },

  postNewComment(db, newComment) {
    return db
      .insert(newComment)
      .into('rollplay_comments')
      .returning('*')
      .then(([comment]) => comment);
  },

  editComment(db, comment_id, newEdits) {
    return db('rollplay_comments')
      .update(newEdits)
      .where(
        db.raw(`rollplay_comments.comment_id=${comment_id}`)
      );
  },

  deleteComment(db, user_id, comment_id) {
    return db('rollplay_comments')
      .where(
        db.raw(`rollplay_comments.comment_owner=${user_id}
        and rollplay_comments.comment_id=${comment_id}`)
      )
      .delete();
  }
};

module.exports = CommentsService;